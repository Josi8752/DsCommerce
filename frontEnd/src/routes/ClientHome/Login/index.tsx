import './styles.css';
import { useState } from 'react';
import { CredentialsDTO } from '../../../models/auth';
import * as authService from '../../../services/auth-service';

export default function Login() {

    const [formData, setFormData] = useState<CredentialsDTO>({
        username: "",
        password: ""
    });

    function handleFormSubmit(event: any) {

        event.preventDefault();

        authService.loginRequest(formData)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log("Erro no login", error);
            })

    }

    function handleInputChange(event: any) {

        const value = event.target.value;
        const name = event.target.name;
        setFormData({ ...formData, [name]: value });

    }

    return (
        <main>
            <section id="login-section" className="dsc-container">
                <div className="dsc-login-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleFormSubmit}>
                        <h2>Login</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <input className="dsc-form-control"
                                    name='username'
                                    value={formData.username}
                                    type="text"
                                    placeholder="Email"
                                    onChange={handleInputChange}
                                />
                                <div className="dsc-form-error"></div>
                            </div>
                            <div>
                                <input className="dsc-form-control"
                                    name='password'
                                    value={formData.password}
                                    type="password"
                                    placeholder="Senha"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="dsc-login-form-buttons dsc-mt20">
                            <button type="submit" className="dsc-btn dsc-btn-blue">Entrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}