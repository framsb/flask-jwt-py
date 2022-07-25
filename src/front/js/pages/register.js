import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [register, setRegister] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		email: "",
	  });

	  const [errors, setErrors] = useState({
		username: false,
		email: false,
		password: false,
		confirmPassword: false,
	  });

	  const data_register = (e) => {
		setRegister({
		  ...register,
		  [e.target.name]: e.target.value,
		});
	  };
	  const handleSubmit = async () => {
		let data = {
		  username: register.username,
		  email: register.email,
		  password: register.password,
		};
		if (await actions.register(data)) {
		  history.push("/private");
		} else {
		  alert("El usuario ya existe, intente de nuevo");
		}
	  };

	  let name_regex = /^(?=[a-zA-Z0-9._]{5,20}$)[^_.].*[^_.]$/;
	  let email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	  let password_regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

	return (
		<div className="container">
			<div className="card card-1">
						<div className="card-title">
							<h2 className="title px-4">Registration Form</h2>
						</div>
						<div className="card-body">
						<div className="col-9">
							<div className="input-group">
								<div className="new iconBox">
									<i className="fa fa-user" aria-hidden="true"></i>
								</div>
								<input type="text" name="username"
								placeholder="Username"
								required
								value={register.username}
								onChange={data_register}
								onBlur={(e) => {
								  if (name_regex.test(register.username)) {
									setErrors({ ...errors, username: false });
								  } else {
									setErrors({ ...errors, username: true });
								  }
								}}
							  />
							</div>
						</div>
						<div className="col-9 py-3">
							<div className="input-group">
							<div className="fl iconBox"><i className="fa fa-envelope" aria-hidden="true"></i></div>
								<input 
									name="email"
									placeholder="Email"
									type="text"
									required
									value={register.email}
									onChange={data_register}
									onBlur={(e) => {
										if (email_regex.test(register.email)) {
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
										value={register.password}
										onChange={data_register}
										onBlur={(e) => {
										if (password_regex.test(register.password)) {
											setErrors({ ...errors, password: false });
										} else {
											setErrors({ ...errors, password: true });
										}
										}}
									/>
							</div>
						</div>
						<div className="col-9 py-3">
							<div className="input-group">
							<div className="fl iconBox"><i className="fa fa-key" aria-hidden="true"></i></div>
								<input name="confirmPassword"
										placeholder="Confirm password"
										required
										type="text"
										value={register.confirmPassword}
										onChange={data_register}
										onBlur={(e) => {
										if (register.confirmPassword !== register.password) {
											setErrors({ ...errors, confirmPassword: true });
										} else {
											setErrors({ ...errors, confirmPassword: false });
										}
										}}
									/>
							</div>
						</div>
						<div className="py-5 px-3">
						<button className="button1" 
								type="button"
								onClick={handleSubmit}
								disabled={
								errors.email ||
								errors.password ||
								errors.repeat ||
								!register.username.length > 0 ||
								!register.email.length > 0 ||
								!register.password.length > 0 ||
								!register.confirmPassword.length > 0
                          }>
							Registrate!
						</button>
						</div>
						</div>
						</div>
						{localStorage.getItem("token") != undefined && (
        <Redirect to={"/private"}></Redirect>
      )}
					</div>
	);
};
