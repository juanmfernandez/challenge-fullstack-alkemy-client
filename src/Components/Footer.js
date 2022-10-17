function Footer(){
    return(
        <footer class="bd-footer">
        <div class="container py-5">
            <div class="row">
            <div class="col-lg-3 mb-3">
                <a class="d-inline-flex align-items-center mb-2 link-dark text-decoration-none" href="/" aria-label="Bootstrap">
                <span class="fs-5">Challenge Fullstack Presupuesto</span>
                </a>
            </div>
            <div class="col-6 col-lg-2 offset-lg-1 mb-3">
                <h5>Juan Manuel Fernandez</h5>
            </div>
            <div class="col-6 col-lg-2 mb-3">
                <h5>Projects - Deploys</h5>
                <ul class="list-unstyled">
                    <li class="mb-2"><a href="https://alkemy.alwaysdata.net/">This back-end</a></li>
                    <li class="mb-2"><a href="https://ishoes.alwaysdata.net/">Proyecto final Digital House</a></li>
                </ul>
            </div>
            <div class="col-6 col-lg-2 mb-3">
                <h5>Community</h5>
                <ul class="list-unstyled">
                    <li class="mb-2"><a href="https://github.com/juanmfernandez/">My repos</a></li>
                    <li class="mb-2"><a href="https://www.linkedin.com/in/juan-manuel-fernandez-4b701629/">Linkedin</a></li>
                </ul>
            </div>
            </div>
        </div>
        </footer>        
    )
}

export default Footer;