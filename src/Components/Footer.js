function Footer(){
    return(
        <footer className="bd-footer">
        <div className="container py-5">
            <div className="row">
            <div className="col-lg-3 mb-3">
                <span className="fs-5">Challenge Fullstack Presupuesto</span>
            </div>
            <div className="col-6 col-lg-2 offset-lg-1 mb-3">
                <h5>Juan Manuel Fernandez</h5>
            </div>
            <div className="col-6 col-lg-2 mb-3">
                <h5>Projects - Deploys</h5>
                <ul className="list-unstyled">
                    <li className="mb-2"><a href="https://alkemy.alwaysdata.net/">This back-end</a></li>
                    <li className="mb-2"><a href="https://ishoes.alwaysdata.net/">Proyecto final Digital House</a></li>
                </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3">
                <h5>Community</h5>
                <ul className="list-unstyled">
                    <li className="mb-2"><a href="https://github.com/juanmfernandez/">My repos</a></li>
                    <li className="mb-2"><a href="https://www.linkedin.com/in/juan-manuel-fernandez-4b701629/">Linkedin</a></li>
                </ul>
            </div>
            </div>
        </div>
        </footer>        
    )
}

export default Footer;