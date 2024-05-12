import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navigation from "./components/Navigation";
import { useContext, useEffect, useState } from "react";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";


function App() {
  const { client } = useContext(Context);
  const [loading, setLoading] = useState(true);

  
    useEffect(
      () => {
        if (localStorage.getItem('token') != null) {
        try {
          check().then(data => {
            console.log(data);
            client.setClient(data);
            client.setIsAuth(true);
          }

          )

        }
        catch (e) {
          console.log(e);
        }
      }
      setLoading(false);
    },
      [] // выполнится 1 раз
    );


    if (loading) {
      return <Spinner animation={"grow"} />
    };
  

  return (
    <BrowserRouter>
      <Navigation />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
