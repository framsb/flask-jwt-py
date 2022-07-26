import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [login, setlogin] = useState({
		email: "",
        password: "",
	  });

	  const [errors, setErrors] = useState({
		email: false,
		password: false,
	  });

	  const data_login = (e) => {
		setlogin({
		  ...login,
		  [e.target.name]: e.target.value,
		});
	  };
	  
	  const handleSubmit = async () => {
		let data = {
		  email: login.email,
		  password: login.password,
		};
		if (await actions.login_user(data)) {
		  history.push("/private");
		} else {
		  alert("Invalid");
		}
	  };

	  let email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	  let password_regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

	return (
		<div className="container">
			<div className="card card-1">
						<div className="card-title">
							<h2 className="title px-4">Login</h2>
						</div>
						<div className="card-body">
						<div className="col-9">
						<div className="col-9 pb-3">
							<div className="input-group">
							<div className="fl iconBox"><i className="fa fa-envelope" aria-hidden="true"></i></div>
								<input 
									name="email"
									placeholder="Email"
									type="text"
									required
									value={login.email}
									onChange={data_login}
									onBlur={(e) => {
										if (email_regex.test(login.email)) {
										setErrors({ ...errors, email: false });
										} else {
										setErrors({ ...errors, email: true });
										}
									}}
									/>
							</div>
						</div>
						<div className="col-9">
							<div className="input-group">
							<div className="fl iconBox"><i className="fa fa-key" aria-hidden="true"></i></div>
								<input name="password"
										placeholder="Password"
										required
										type="text"
										value={login.password}
										onChange={data_login}
										onBlur={(e) => {
										if (password_regex.test(login.password)) {
											setErrors({ ...errors, password: false });
										} else {
											setErrors({ ...errors, password: true });
										}
										}}
									/>
							</div>
						</div>
						</div>
						<div className="py-5 px-5">
						<button className="button1" 
								type="button"
								onClick={handleSubmit}
								disabled={
								errors.email ||
								errors.password ||
								!login.email.length > 0 ||
								!login.password.length > 0
                                }>
							Login !
						</button>
						</div>
						<div className="text-center">
						<Link to="/register">
						I don't have an account
					</Link></div>
						</div>
						</div>
						{localStorage.getItem("token") != undefined && (
        <Redirect to={"/private"}></Redirect>
      )}
					</div>
	);
};
