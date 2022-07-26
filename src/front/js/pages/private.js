import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
  const { actions } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    actions.private();
  }, []);

	return (
		<div className="container">
			<div className="card card-1">
						<div className="card-title">
							<h2 className="title text-center">Private data</h2>
						</div>
						<div className="card-body">
							<h2 className="title px-5">Hello word¿?</h2>
							<h2 className="title px-5">:D</h2>
							<button
								className="button1"
								onClick={(e) => {
									localStorage.removeItem("token");
									history.push("/login");
								}}
								>
								Log out
							</button>
						</div>
			</div>
			{localStorage.getItem("token") == undefined && <Redirect to={"/login"} />}
			</div>
	);
};

