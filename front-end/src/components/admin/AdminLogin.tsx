import useForm from "@hooks/useForm";
import axios from 'axios';
import { AdminLoginRequest } from '@apis/types/request';
import { END_POINT } from '@apis/ApiConstants';
import { instance } from '@apis/axios';

const onLogin = async (data : AdminLoginRequest) => {
    try {
        const response = await instance.post(END_POINT.ADMIN+'/login', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (response) {
            console.log(response.data)
            if(response.data.isSuccess) console.log("admin login 성공");
            else console.log("admin login 실패");
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

    return(<div><form>
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
        <button onClick={handleSubmit}
        >Login</button>
    </form></div>)
}

export default AdminLogin;