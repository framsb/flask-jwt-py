const getState = ({ getStore, getActions, setStore }) => {
	const API_URL = process.env.BACKEND_URL;
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			register: async (data) => {
				let response = await fetch(`${API_URL}/api/register`, {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify(data),
				});
				console.log(response.status);
				if (response.status == 200) {
				  let data = await response.json();
				  localStorage.setItem("token", data.token);
				  setStore({ isLoggedIn: true });
				  return true;
				} else return false;
			  },
			  private: async () => {
				let response = await fetch(`${API_URL}/api/private`, {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				  },
				});
				let data = await response.json();
				console.log("Data user", data);
			  },
			  login_user: async (data) => {
				let response = await fetch(`${API_URL}/api/login`, {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify(data),
				});
				if (response.ok) {
				  let data = await response.json();
				  localStorage.setItem("token", data.token);
				  return true;
				} else return false;
			  },
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});


				//reset the global store
				setStore({ demo: demo });
				
			}
		}
	};
};

export default getState;
