import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Profile() {
    const user = useSelector(storeState => storeState.userModule.user)

    return (
        <section className="seller-profile">
            <section className="content-wrapper">
                <div className="profile-container">
                    <div className="user-profil">
                  
                                    <div className="online-status">
                                        <span className="online-indicator"></span>
                                        <span className="online-text">Online</span>
                                    </div>
                            
                        <div className="img-container">
                            <img src={user.imgUrl} />
                        </div>
                        <h2>{user.fullname}</h2>
                        <div className="user-stats">
                            <ul>
                                <li className="flex space-between">
                                    <div>
                                        <span><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxMiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjNjI2NDZhIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48cGF0aCBkPSJNNS4zODMzOCAxNS42NzcyQzAuODQyODEzIDkuMDk0NzIgMCA4LjQxOTE2IDAgNkMwIDIuNjg2MjggMi42ODYyOCAwIDYgMEM5LjMxMzcyIDAgMTIgMi42ODYyOCAxMiA2QzEyIDguNDE5MTYgMTEuMTU3MiA5LjA5NDcyIDYuNjE2NjIgMTUuNjc3MkM2LjMxODY2IDE2LjEwNzYgNS42ODEzMSAxNi4xMDc2IDUuMzgzMzggMTUuNjc3MlpNNiA4LjVDNy4zODA3MiA4LjUgOC41IDcuMzgwNzIgOC41IDZDOC41IDQuNjE5MjggNy4zODA3MiAzLjUgNiAzLjVDNC42MTkyOCAzLjUgMy41IDQuNjE5MjggMy41IDZDMy41IDcuMzgwNzIgNC42MTkyOCA4LjUgNiA4LjVaIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iY2xpcDAiPjxyZWN0IHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==" /></span>
                                        Country
                                    </div>
                                    <span>United States</span>
                                </li>
                                <li className="flex space-between">
                                    <div>
                                        <span><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNCAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjNjI2NDZhIj48cGF0aCBkPSJNNyA4QzkuMjA5MzggOCAxMSA2LjIwOTM3IDExIDRDMTEgMS43OTA2MyA5LjIwOTM4IDAgNyAwQzQuNzkwNjMgMCAzIDEuNzkwNjMgMyA0QzMgNi4yMDkzNyA0Ljc5MDYzIDggNyA4Wk05LjggOUg5LjI3ODEyQzguNTg0MzcgOS4zMTg3NSA3LjgxMjUgOS41IDcgOS41QzYuMTg3NSA5LjUgNS40MTg3NSA5LjMxODc1IDQuNzIxODggOUg0LjJDMS44ODEyNSA5IDAgMTAuODgxMyAwIDEzLjJWMTQuNUMwIDE1LjMyODEgMC42NzE4NzUgMTYgMS41IDE2SDEyLjVDMTMuMzI4MSAxNiAxNCAxNS4zMjgxIDE0IDE0LjVWMTMuMkMxNCAxMC44ODEzIDEyLjExODcgOSA5LjggOVoiLz48L3N2Zz4=" /></span>
                                        Member Since
                                    </div>
                                    <span>June 2024</span>
                                </li>
                             
                            </ul>
                        </div>

                    </div>
                    <div className="description-container">
                        <ul>
                            <li>
                                <h3>Description</h3>
                                <p>Hello, this is {user.fullname}, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.</p>
                            </li>
                        </ul>
                    </div>
                    <button className="chat-seller-btn">Messages</button>
                </div>
                <div className="gigs-status">
                    <ul className="status-filter-bar">
                        <li>Active Gigs</li>
                    </ul>
                    <div className="gigs-status-list">
                        <div className="add-gig">
                            <Link to="/gig/edit">
                                <div>
                                    <span className="add-gig-btn">+</span>
                                    <p>Create a new Gig</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}