
import "./FooterComponent.css"
const FooterComponent = () => {

    return(
        <>
            <footer className="text-center">
                <h2 className="py-5 underline">Links</h2>
                <span className="icons">
                    <a href="https://telegram.com/pumpfun_tokensupply_bot"><i className="fa-brands fa-telegram"></i></a>&nbsp; &nbsp;
                    <a href="https://x.com/mo64090more?s=21"><i className="fa-solid fa-x"></i></a>
                </span>
                <div className="mb-5">
                    <i className="fa fa-copyright" aria-hidden="true"></i> All rights reserved 2025 | Trade better | Protect wallet!
                </div>
            </footer>
        </>
    )
}
export default FooterComponent