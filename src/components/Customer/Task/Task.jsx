import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import './Task.css'
export default function Task() {
  return (
    <>
      <div className="main px-5 py-3">
        <Form className=" px-5 pb-5">
          <nav className="px-5 d-flex justify-content-between align-items-center">
            <h3>Tasks</h3>
            <button className="Btn py-1 disabled">Save</button>
          </nav>
            <Form.Group className="mb-3 px-5" controlId="formGrid">
            <Form.Label>Task Name <span className=" text-danger m-0 mt-2">*</span> </Form.Label>
            <Form.Control  className=" input"/>
          </Form.Group>
          
          <Form.Group className="mb-3 px-5" controlId="formGrid">
            <Form.Label>Task Description <span className=" text-danger m-0 mt-2">*</span></Form.Label>
            <Form.Control    as="textarea" rows={3} className=" bg-light shadow-none input"/>
          </Form.Group>
          <Row className="mb-3 px-5 mt-4">
            <Form.Group as={Col} controlId="formGrid">
              <Form.Label>Jop Title <span className=" text-danger m-0 mt-2">*</span></Form.Label>
              <Form.Control  className=" input"  type="Jop Title" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridJop Level">
              <Form.Label>Jop Level <span className=" text-danger m-0 mt-2">*</span></Form.Label>
              <Form.Control  className=" input"  type="Jop Level"  />
            </Form.Group>
          </Row>

        


          <Row className="mb-3 px-5">
             <Form.Group as={Col} controlId="formGridDayes">
              <Form.Label>Dayes To complete the Task <span className=" text-danger m-0 mt-2">*</span></Form.Label>
              <Form.Control  className=" input"  type="number">
                
              </Form.Control >
            </Form.Group>
            <Form.Group as={Col} controlId="formGrid">
              <Form.Label>Price per task <span className=" text-danger m-0 mt-2">*</span> </Form.Label>
              <Form.Control  className=" input"  />
            </Form.Group>

           
          </Row>

             <div className="input bg-light-wrapper px-5 mt-4">
                <div className="drop-zone">
                  
                    <span>Choose file (PDF, DOC, DOCX)</span>
                  
                  <label htmlFor="uploaded_cv" className="upload-btn">
                    Upload
                  </label>
                  <input
                    type="file"
                    name="uploaded_cv"
                    id="uploaded_cv"
                    className="cv-input"
                    accept=".pdf,.doc,.docx"
                    
                  />
                </div>
              </div>

        </Form>
      </div>
    </>
  );
}
