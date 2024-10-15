import { Calculadora } from "../components/calculator/Calculadora"
import { Dama } from "../components/dama/Dama"

import "./home.style.css"

export const Home = () => {
    return(
        <div>
            <h1>Projetos</h1>
            <div className="projects">

                <hr className="project-hr" />

                <div className="project">
                    <div className="project-data">
                        <h2 className="project-title right">Dama</h2>
                        <p className="project-description right">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus officiis quae, quam soluta dicta deserunt in amet iusto culpa quibusdam libero ad corrupti numquam corporis ea unde quasi commodi maiores.
                        Itaque, dolor alias? Voluptas eos velit voluptatem, sint esse dolor harum quod aut, dicta optio quasi magni. Beatae vero impedit quidem dolorem provident debitis repellendus nobis deleniti quae, exercitationem quisquam!
                        Temporibus eum distinctio obcaecati cumque, similique ipsa sint! Natus odio a cum possimus ipsa tenetur eaque, quo quaerat autem praesentium inventore excepturi laborum eius voluptate asperiores voluptatum itaque dolore impedit.</p>
                    </div>
                    <Dama />
                </div>

                <hr className="project-hr" />

                <div className="project">
                    <Calculadora />
                    <div className="project-data">
                        <h2 className="project-title left">Calculadora</h2>
                        <p className="project-description left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus officiis quae, quam soluta dicta deserunt in amet iusto culpa quibusdam libero ad corrupti numquam corporis ea unde quasi commodi maiores.
                        Itaque, dolor alias? Voluptas eos velit voluptatem, sint esse dolor harum quod aut, dicta optio quasi magni. Beatae vero impedit quidem dolorem provident debitis repellendus nobis deleniti quae, exercitationem quisquam!
                        Temporibus eum distinctio obcaecati cumque, similique ipsa sint! Natus odio a cum possimus ipsa tenetur eaque, quo quaerat autem praesentium inventore excepturi laborum eius voluptate asperiores voluptatum itaque dolore impedit.</p>
                    </div>
                </div>

                <hr className="project-hr" />

                <div className="project">
                    <div className="project-data">
                        <h2 className="project-title right">Change Theme Switch</h2>
                        <p className="project-description right">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus officiis quae, quam soluta dicta deserunt in amet iusto culpa quibusdam libero ad corrupti numquam corporis ea unde quasi commodi maiores.
                        Itaque, dolor alias? Voluptas eos velit voluptatem, sint esse dolor harum quod aut, dicta optio quasi magni. Beatae vero impedit quidem dolorem provident debitis repellendus nobis deleniti quae, exercitationem quisquam!
                        Temporibus eum distinctio obcaecati cumque, similique ipsa sint! Natus odio a cum possimus ipsa tenetur eaque, quo quaerat autem praesentium inventore excepturi laborum eius voluptate asperiores voluptatum itaque dolore impedit.</p>
                    </div>
                    <Calculadora />
                </div>

                <hr className="project-hr" />

                <div className="project">
                    <Calculadora />
                    <div className="project-data">
                        <h2 className="project-title left">Snake Game</h2>
                        <p className="project-description left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus officiis quae, quam soluta dicta deserunt in amet iusto culpa quibusdam libero ad corrupti numquam corporis ea unde quasi commodi maiores.
                        Itaque, dolor alias? Voluptas eos velit voluptatem, sint esse dolor harum quod aut, dicta optio quasi magni. Beatae vero impedit quidem dolorem provident debitis repellendus nobis deleniti quae, exercitationem quisquam!
                        Temporibus eum distinctio obcaecati cumque, similique ipsa sint! Natus odio a cum possimus ipsa tenetur eaque, quo quaerat autem praesentium inventore excepturi laborum eius voluptate asperiores voluptatum itaque dolore impedit.</p>
                    </div>
                </div>

                <hr className="project-hr" />

                <div className="project">
                    <div className="project-data">
                        <h2 className="project-title right">Campo Minado</h2>
                        <p className="project-description right">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus officiis quae, quam soluta dicta deserunt in amet iusto culpa quibusdam libero ad corrupti numquam corporis ea unde quasi commodi maiores.
                        Itaque, dolor alias? Voluptas eos velit voluptatem, sint esse dolor harum quod aut, dicta optio quasi magni. Beatae vero impedit quidem dolorem provident debitis repellendus nobis deleniti quae, exercitationem quisquam!
                        Temporibus eum distinctio obcaecati cumque, similique ipsa sint! Natus odio a cum possimus ipsa tenetur eaque, quo quaerat autem praesentium inventore excepturi laborum eius voluptate asperiores voluptatum itaque dolore impedit.</p>
                    </div>
                    <Calculadora />
                </div>
            </div>
        </div>
    )
}