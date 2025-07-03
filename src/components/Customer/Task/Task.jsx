import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Task.css";

export default function Task() {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch task data if in edit mode
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchTaskData();
    }
  }, [id]);

const fetchTaskData = async () => {
  try {
    setLoading(true);
    const response = await axios.get(`${url}/service-post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",

      },
    });
    
    // Add debug logging to inspect the response
    console.log("Full API response:", response);
    console.log("Response data:", response.data);
    
    // Check if the expected data exists
    if (!response.data || !response.data.post) {
      throw new Error("Invalid API response structure");
    }
    
    const task = response.data.post;
    
    // Add debug logging for the task data
    console.log("Task data:", task);
    
    formik.setValues({
      task_name: task.title || "",
      task_description: task.description || "",
      required_skills: task.required_skills ? task.required_skills.join(", ") : "",
      service_type: task.service_type || "",
      deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : "",
      price_per_task: task.budget_range || "",
      contact_info: task.contact_info || "",
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    toast.error(error.response?.data?.message || error.message || "Failed to load task data");
  } finally {
    setLoading(false);
  }
};
  const formik = useFormik({
    initialValues: {
      task_name: "",
      task_description: "",
      required_skills: "",
      service_type: "",
      deadline: "",
      price_per_task: "",
      contact_info: "",
    },
    validationSchema: Yup.object({
      task_name: Yup.string().required("Task name is required"),
      task_description: Yup.string()
        .required("Task description is required")
        .min(20, "Description should be at least 20 characters"),
      required_skills: Yup.string().required("Skills are required"),
      service_type: Yup.string().required("Service type is required"),
      deadline: Yup.date()
        .required("Deadline is required")
        .min(new Date(), "Deadline must be in the future"),
      price_per_task: Yup.string().required("Price is required"),
      contact_info: Yup.string()
        .required("Contact Info is required")
        .email("Invalid email format"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      
      const payload = {
        title: values.task_name,
        description: values.task_description,
        required_skills: values.required_skills.split(",").map(s => s.trim()),
        service_type: values.service_type,
        deadline: values.deadline,
        budget_range: values.price_per_task,
        contact_info: values.contact_info,
      };

      try {
        if (isEditing) {
          await axios.put(`${url}/service-post/${id}`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          toast.success("Task updated successfully!");
        } else {
          await axios.post(`${url}/service-post/create`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          toast.success("Task created successfully!");
        }
        navigate("/Cuhome");
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response?.data?.message || "Operation failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleClear = () => {
    formik.resetForm();
  };

  return (
    <>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="main px-5 py-3">
        <Form className="px-5 pb-5" onSubmit={formik.handleSubmit}>
          <nav className="px-5 py-3 d-flex justify-content-between align-items-center">
            <h3>{isEditing ? "Edit Task" : "Post a Task"}</h3>
            <div className="d-flex gap-3">
              <button 
                type="button" 
                className="btn btn-outline-danger" 
                onClick={handleClear}
                disabled={loading}
              >
                Clear
              </button>
              <button 
                className="Btn py-1" 
                type="submit" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  isEditing ? "Update Task" : "Post Task"
                )}
              </button>
            </div>
          </nav>

          <Form.Group className="mb-3 px-5">
            <Form.Label>Task Name <span className="text-danger">*</span></Form.Label>
            <Form.Control
              className="input"
              name="task_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.task_name}
              isInvalid={formik.touched.task_name && !!formik.errors.task_name}
              placeholder="e.g. Website Redesign"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.task_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 px-5">
            <Form.Label>Task Description <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              className="bg-light shadow-none input"
              name="task_description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.task_description}
              isInvalid={formik.touched.task_description && !!formik.errors.task_description}
              placeholder="Describe the task in detail..."
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.task_description}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3 px-5 mt-4">
            <Form.Group as={Col} md={6}>
              <Form.Label>Required Skills <span className="text-danger">*</span></Form.Label>
              <Form.Control
                className="input"
                name="required_skills"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.required_skills}
                isInvalid={formik.touched.required_skills && !!formik.errors.required_skills}
                placeholder="e.g. React, Node.js, UI/UX Design"
              />
              <Form.Text className="text-muted">
                Separate skills with commas
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {formik.errors.required_skills}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={6}>
              <Form.Label>Contact Info <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                className="input"
                name="contact_info"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contact_info}
                isInvalid={formik.touched.contact_info && !!formik.errors.contact_info}
                placeholder="your@email.com"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.contact_info}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3 px-5">
            <Form.Group as={Col} md={6}>
              <Form.Label>Service Type <span className="text-danger">*</span></Form.Label>
              <Form.Select
                className="input"
                name="service_type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.service_type}
                isInvalid={formik.touched.service_type && !!formik.errors.service_type}
              >
                <option value="">Select service type</option>
                <option value="One Time">One Time</option>
                <option value="Recurring">Recurring</option>
                <option value="Long Term">Long Term</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.service_type}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={6}>
              <Form.Label>Deadline <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="date"
                className="input"
                name="deadline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deadline}
                isInvalid={formik.touched.deadline && !!formik.errors.deadline}
                min={new Date().toISOString().split('T')[0]}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.deadline}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3 px-5">
            <Form.Label>Price/Budget <span className="text-danger">*</span></Form.Label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <Form.Control
                className="input"
                name="price_per_task"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price_per_task}
                isInvalid={formik.touched.price_per_task && !!formik.errors.price_per_task}
                placeholder="e.g. 500 or 1000-1500"
              />
            </div>
            <Form.Control.Feedback type="invalid">
              {formik.errors.price_per_task}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}