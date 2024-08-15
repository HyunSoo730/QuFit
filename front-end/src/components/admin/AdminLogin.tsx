import useForm from "@hooks/useForm";
import axios from 'axios';
import { AdminLoginRequest } from '@apis/types/request';
import { END_POINT } from '@apis/ApiConstants';
import { instance } from '@apis/axios';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@routers/PathConstants';
import { useSetAccessTokenStore } from '@stores/auth/tokenStore';

const onLogin = async (data : AdminLoginRequest) => {
    const navigate = useNavigate();
    const setAccessToken = useSetAccessTokenStore();

    try {
        const response = await instance.post(END_POINT.ADMIN+'/login', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (response) {
            if(response.data.isSuccess) {
                console.log("admin login 성공");
                const bearerToken = response.headers.authorization;
                setAccessToken(bearerToken);
                navigate(PATH.ADMIN);
            }
            else {
                console.log("admin login 실패");
                navigate(PATH.INTRODUCTION);
            }
        } 
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(error);
        } 
    }
};
const AdminLogin = () => {
    const { values, handleSubmit, handleChange } = useForm({
        initialValues: { userId: '', password: '' },
        onSubmit: onLogin
        });

    return(
        <div className="flex flex-col items-center justify-center h-full gap-10 bg-lightPurple-7">
        <div>
            <label htmlFor="userId"> userId </label>
            <input
                        id="userId"
                        name="userId"
                        value={values.userId}
                        onChange={handleChange}
                    />
        </div>
        <div>
            <label htmlFor="password"> password </label>
            <input
                        id="password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                    />
        </div>
        <button className="flex p-2 border-2 rounded-md item-center border-lightPurple-1" onClick={handleSubmit}
        >Login</button>
</div>)
}

export default AdminLogin;