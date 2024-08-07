import React, { useState, useRef, useEffect } from 'react';
import Lottie, { AnimationConfigWithData, AnimationItem } from 'lottie-web';

// Define the interface for the props
interface LottieComponentProps {
    animationData: object; // Replace 'object' with the specific type if available
    loop?: boolean;
    autoplay?: boolean;
    speed?: number;
    isPaused?: boolean;
    isStopped?: boolean;
    init?: number;
    end?: number;
    [key: string]: any; // For any additional props
}

// Define the Lottie component
const LottieComponent: React.FC<LottieComponentProps> = ({
    animationData,
    loop = true,
    autoplay = true,
    speed,
    isPaused,
    isStopped,
    init = 0,
    end = 10000,
    ...restProps
}) => {
    // Ref for the Lottie animation container
    const animationContainer = useRef<HTMLDivElement | null>(null);
    const [animationInstance, setAnimationInstance] = useState<AnimationItem | null>(null);

    // Load and initialize the Lottie animation
    useEffect(() => {
        if (!animationContainer.current) return;

        const animationOptions: AnimationConfigWithData<'svg'> = {
            container: animationContainer.current,
            renderer: 'svg',
            loop: loop,
            autoplay: autoplay,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        };

        // Load the Lottie animation
        const animation = Lottie.loadAnimation(animationOptions);
        // Update the animation instance state
        setAnimationInstance(animation);
        // Cleanup animation on component unmount

        return () => {
            animation.destroy();
        };
    }, [animationData, loop, autoplay, init, end]);

    // Manage Lottie interactions
    useEffect(() => {
        if (animationInstance !== null) {
            // Pause or play based on isPaused prop
            if (isPaused) {
                animationInstance.pause();
            } else {
                animationInstance.play();
            }

            // Stop based on isStopped prop
            if (isStopped) {
                animationInstance.stop();
            } else {
                animationInstance.playSegments([init, end], true);
            }

            // Set speed if provided
            if (speed !== undefined) {
                animationInstance.setSpeed(speed);
            }
        }
    }, [isPaused, isStopped, speed, animationInstance]);

    return <div ref={animationContainer} {...restProps} />;
};

export default LottieComponent;
