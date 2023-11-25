
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx"
import Main from "../Main/Main.jsx"
import React from "react";


 export default function ProtectedPage({ ...props}) {
    return(
        <>
        <Header />
        <Main {...props}/>
        <Footer/>
        </>
    )
}