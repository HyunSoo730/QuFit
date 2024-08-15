import React, { useEffect, useRef, useState } from 'react';
import { FaceLandmarker } from '@mediapipe/tasks-vision';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { LocalVideoTrack, RemoteVideoTrack } from 'livekit-client';
import { CameraOffIcon, CrownIcon, MicOffIcon, MicOnIcon } from '@assets/svg/video';
import { useRoomStateStore } from '@stores/video/roomStore';

// 가면 URL 배열
const maskUrls = [
    '/assets/raccoon_head.glb',
    '/assets/cat/scene.gltf',
    '/assets/deer/scene.gltf',
    '/assets/rabbit/scene.gltf',
];

// 참가자 순서에 따라 가면을 선택하는 함수
function getMaskUrl(order: number): string {
    return maskUrls[order % maskUrls.length];
}

interface VideoComponentProps {
    track?: LocalVideoTrack | RemoteVideoTrack;
    participateName: string;
    local?: boolean;
    isManager: boolean;
    faceLandmarkerReady: boolean;
    faceLandmarker: FaceLandmarker | null;
    id: number | undefined;
    status: 'wait' | 'meeting';
    roomMax?: number;
    participantOrder: number;
}

class Avatar {
    scene: THREE.Scene;
    loader: GLTFLoader = new GLTFLoader();
    gltf: THREE.Group | null = null;

    constructor(modelUrl: string, scene: THREE.Scene) {
        this.scene = scene;
        this.loadModel(modelUrl);
    }

    loadModel(modelUrl: string) {
        this.loader.load(modelUrl, (gltf) => {
            if (this.gltf) {
                this.scene.remove(this.gltf);
            }
            this.gltf = gltf.scene;
            this.scene.add(this.gltf);
        });
    }

    updateTransform(position: THREE.Vector3, rotation: THREE.Euler) {
        if (this.gltf) {
            this.gltf.position.copy(position);
            this.gltf.rotation.copy(rotation);
        }
    }
}

// 최신 코드
function VideoComponent({
    track,
    isManager,
    participateName,
    status,
    local = false,
    faceLandmarkerReady,
    faceLandmarker,
    participantOrder,
}: VideoComponentProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMicEnable, setIsMicEnable] = useState(true);
    const maskPositionRef = useRef(new THREE.Vector3());
    const maskRotationRef = useRef(new THREE.Euler());
    const [avatar, setAvatar] = useState<Avatar | null>(null);
    const room = useRoomStateStore();
    const [isCameraEnable, setIsCameraEnable] = useState(status === 'meeting');
    const [isMaskReady, setIsMaskReady] = useState(false); // 가면 준비 상태

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                videoRef.current!.play();

                if (faceLandmarkerReady && faceLandmarker) {
                    const scene = new THREE.Scene();
                    const maskUrl = getMaskUrl(participantOrder);
                    const newAvatar = new Avatar(maskUrl, scene);
                    setAvatar(newAvatar);

                    // 가면 로딩 완료 시 isMaskReady를 true로 설정
                    newAvatar.loader.manager.onLoad = () => {
                        setIsMaskReady(true);
                    };
                    

                    const interval = setInterval(() => {
                        if (
                            videoRef.current &&
                            videoRef.current.readyState === 4 &&
                            videoRef.current.videoWidth > 0 &&
                            videoRef.current.videoHeight > 0
                        ) {
                            try {
                                const result = faceLandmarker.detectForVideo(videoRef.current, Date.now());

                                if (result.faceLandmarks && result.faceLandmarks.length > 0) {
                                    const landmarks = result.faceLandmarks[0];
                                    const avgPosition = new THREE.Vector3();
                                    const indices = [0, 1, 4, 6, 9, 13, 14, 17, 33, 263, 61, 291, 199];

                                    indices.forEach((index) => {
                                        avgPosition.add(
                                            new THREE.Vector3(
                                                landmarks[index].x,
                                                landmarks[index].y,
                                                landmarks[index].z,
                                            ),
                                        );
                                    });
                                    avgPosition.divideScalar(indices.length);

                                    const x = Math.max(-3, Math.min(3, (avgPosition.x - 0.5) * 6));
                                    const y = Math.max(-3, Math.min(3, -(avgPosition.y - 0.5) * 6));
                                    const z = Math.max(-7.5, Math.min(0, -avgPosition.z * 15));

                                    maskPositionRef.current.set(x, y, z);

                                    if (
                                        result.facialTransformationMatrixes &&
                                        result.facialTransformationMatrixes.length > 0
                                    ) {
                                        const matrix = new THREE.Matrix4().fromArray(
                                            result.facialTransformationMatrixes[0].data,
                                        );
                                        maskRotationRef.current.setFromRotationMatrix(matrix);

                                        newAvatar.updateTransform(maskPositionRef.current, maskRotationRef.current);
                                    }
                                }
                            } catch (error) {
                                console.error('VideoComponent: 얼굴 인식 에러 - 참가자 이름:', participateName, ':', error);
                            }
                        }
                    }, 50);

                    return () => clearInterval(interval);
                }
            };

            track?.attach(videoRef.current);
        }
        return () => {
            track?.detach();
        };
    }, [track, participateName, faceLandmarkerReady, faceLandmarker, participantOrder]);

    const changeCameraEnabled = () => {
        if (local) {
            room?.localParticipant.setCameraEnabled(!room?.localParticipant.isCameraEnabled);
            setIsCameraEnable(!room?.localParticipant.isCameraEnabled);
        }
    };

    const changeMicrophoneEnabled = (event: React.MouseEvent) => {
        if (local) {
            event.stopPropagation();
            setIsMicEnable(!room?.localParticipant.isMicrophoneEnabled);
            room?.localParticipant.setMicrophoneEnabled(!room?.localParticipant.isMicrophoneEnabled);
        }
    };

    return (
        <div
            className="relative z-50 flex flex-col justify-between w-full p-4 rounded-xl aspect-video max-[]"
            onClick={changeCameraEnabled}
        >
            <div>{isManager && <CrownIcon width={'2.5rem'} />}</div>
            <div className="flex items-center justify-between w-full">
                <p className="font-medium text-white text-md xs:text-xs sm:text-sm">
                    {participateName + (local ? ' (You)' : '')}
                </p>
                {local && (
                    <>
                        <div>{isMicEnable ? <MicOnIcon width={'1.7rem'} /> : <MicOffIcon width={'1.7rem'} />}</div>
                        <div className="absolute left-0 w-full px-4 pb-3 transition-all duration-1000 group">
                            <button
                                className="invisible w-full h-8 bg-darkPurple rounded-xl group-hover:visible"
                                onClick={(event) => changeMicrophoneEnabled(event)}
                            >
                                <div className="flex items-center justify-center gap-1">
                                    {isMicEnable ? <MicOffIcon width={'1.25rem'} /> : <MicOnIcon width={'1.25rem'} />}
                                    <p className={`text-sm xs:text-xs  ${isMicEnable && ' text-smokeWhite'}`}>
                                        {isMicEnable ? '마이크 끄기' : '마이크 켜기'}
                                    </p>
                                </div>
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="absolute top-0 left-0 w-full -z-10">
                {isCameraEnable || !local ? (
                    <>
                        {/* 비디오와 Canvas를 감싸는 div에 opacity transition 적용 */}
                        <div className={`relative ${isMaskReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                            <video ref={videoRef} className="w-full rounded-xl" />
                            <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} />
                                {avatar && avatar.gltf && <primitive object={avatar.gltf} scale={[6, 6, 6]} />}
                            </Canvas>
                        </div>
                        {/* 가면이 준비되지 않았을 때 로딩 메시지 표시 */}
                        {!isMaskReady && (
                            <div className="absolute top-0 left-0 w-full h-full bg-gray-800 flex items-center justify-center">
                                <p className="text-white">Loading....</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="relative flex items-center justify-center w-full bg-white aspect-video opacity-40 rounded-xl">
                        <CameraOffIcon
                            width={'10rem'}
                            className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}


export default VideoComponent;