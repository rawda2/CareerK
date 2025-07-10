import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile() {
      const [loading,setLoading]=useState(false)
    
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        name: "",
        brief_description: "",
        contact_email: "",
        phone_number: "",
    });
    
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const navigate = useNavigate();
    
    const industries = ["Technology", "Finance", "Healthcare", "Education", "Other"];
    const countries = ["Egypt", "USA", "UK", "Canada", "Australia", "Germany", "Other"];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/customer/profile`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData(response.data);
                if (response.data.profile_picture) {
                    setPreviewImage(`${API_URL}/${response.data.profile_picture}`);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            // First update regular profile data
            await axios.patch(`${API_URL}/customer/edit-profile`, formData, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    Authorization: `Bearer ${token}`,
                },
            });

            // Then handle profile picture upload if a new one was selected
            if (profilePicture) {
                const formDataImg = new FormData();
                formDataImg.append('profile_picture', profilePicture);

                await axios.patch(`${API_URL}/customer/edit-profile`, formDataImg, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            toast.success("Profile updated successfully!");
            navigate('/CusProfile');
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        }
        finally {
          setLoading(false); 
}
    };

    return (
        <section className="d-flex p-4 justify-content-center gap-0">
             <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
            <Container className="Cprofile-page w-75 mt-2 d-flex flex-column">
                <div className="header d-flex gap-3 flex-row-reverse px-3 py-2">
                    <button className="Btn" onClick={handleSubmit}>
            {loading?"Saving.....":"Save"}
                    </button>
                    <button className="btnn py-2 px-3">
                        <Link className="text-decoration-none" to={'/Cprofile'}>Discard</Link>
                    </button>
                </div>
                
                <Card className="mb-4 card rounded-4 p-4">
                    <Card.Body>
                        <Card.Title>Customer Information</Card.Title>
                        <Form className="form py-4 position-relative" onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="customername">
                                        <Form.Label>Customer Name</Form.Label>
                                        <Form.Control
                                            className="rounded-3"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Customer Name"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="email">
                                        <Form.Label>Contact Email </Form.Label>
                                        <Form.Control
                                            className="rounded-3"
                                            type="email"
                                            name="contact_email"
                                            value={formData.contact_email}
                                            onChange={handleChange}
                                            placeholder="Email@Gmail.Com"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Group controlId="phoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            className="rounded-3"
                                            type="text"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            placeholder="+"
                                        />
                                    </Form.Group>
                                </Col>
                                
                            </Row>
                           
                        </Form>
                    </Card.Body>
                </Card>
                <Card className="mb-4 card rounded-4 p-4">
                    <Card.Body>
                        <Card.Title>Profile Picture</Card.Title>
                        <div className="d-flex align-items-center mb-3">
                            {previewImage && (
                                <img 
                                    src={previewImage} 
                                    alt="Profile Preview" 
                                    className="rounded-circle me-3"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            )}
                            <Form.Group controlId="profilePicture" className="flex-grow-1">
                                <Form.Label>Upload Profile Picture</Form.Label>
                                <Form.Control
                                    className="rounded-3"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <Form.Text className="text-muted">
                                    Recommended size: 500x500 pixels
                                </Form.Text>
                            </Form.Group>
                        </div>
                    </Card.Body>
                </Card>

                <Card className="mb-4 card rounded-4 p-4">
                    <Card.Body>
                        <Card.Title>About Cutomer</Card.Title>
                        <Form className="form py-4 position-relative">
                            <Form.Group controlId="description">
                                <Form.Label>Brief Description</Form.Label>
                                <Form.Control
                                    className="rounded-3 w-75"
                                    as="textarea"
                                    rows={4}
                                    name="brief_description"
                                    value={formData.brief_description}
                                    onChange={handleChange}
                                    placeholder="Write your company description"
                                />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    );
}