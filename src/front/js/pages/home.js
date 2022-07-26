import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex">
			<div className="card card-1 ">
						<div className="mx-auto my-5 px-5 pt-5 ">
					<Link to="/register">
						<button className="btn btn-light">
						Register Now
						</button>
					</Link>
					</div>
					<div className="mx-auto mb-5 px-5 pb-5 ">
					<Link to="/login">
						<button className="btn btn btn-light">
						Login !
						</button>
					</Link>
					</div>
			</div>
		</div>
	);
};
