import React, { useEffect, useState } from "react";
import "./documentation.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import LearningAmico from "../../assets/Learning-amico.svg";

const Documentation = ({ user }) => {
  const [documentations, setDocumentations] = useState([]);
  const [documentation, setDocumentation] = useState({});
  const [loading, setLoading] = useState(true);
  const [docLoading, setDocLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState("");
  const [pdfPrev, setPdfPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  const fetchDocumentations = async () => {
    try {
      const { data } = await axios.get(`${server}/api/documentations/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setDocumentations(data.documentations);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to load documentations");
    }
  };

  const fetchDocumentation = async (id) => {
    setDocLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/documentation/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setDocumentation(data.documentation);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load documentation");
    } finally {
      setDocLoading(false);
    }
  };

  const changePdfHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfPrev(reader.result);
        setPdf(file);
      };
      reader.readAsDataURL(file);
      setPdf(file);
    } else {
      toast.error("Please select a PDF file");
    }
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", pdf);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}/documentation`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchDocumentations();
      setTitle("");
      setDescription("");
      setPdf("");
      setPdfPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this documentation?")) {
      try {
        const { data } = await axios.delete(`${server}/api/documentation/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchDocumentations();
        if (documentation._id === id) {
          setDocumentation({});
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    }
  };

  useEffect(() => {
    fetchDocumentations();
  }, [params.id]);

  return (
    <div className="documentation-page">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="left">
            {docLoading ? (
              <Loading />
            ) : documentation.title ? (
              <>
                <h1>{documentation.title}</h1>
                <p className="description">{documentation.description}</p>
                {documentation.pdf ? (
                  <div className="pdf-viewer">
                    <iframe
                      src={`${server}/${documentation.pdf}`}
                      title={documentation.title}
                      width="100%"
                      height="600px"
                      style={{ border: "none" }}
                    >
                      Your browser doesn't support PDFs. 
                      <a href={`${server}/${documentation.pdf}`}>Download PDF</a>
                    </iframe>
                    <a
                      href={`${server}/${documentation.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-btn"
                    >
                      Download PDF
                    </a>
                  </div>
                ) : (
                  <p>No PDF available for this documentation</p>
                )}
              </>
            ) : (
              <div className="no-lecture-selected">
                <img src={LearningAmico} alt="Select a documentation" className="no-lecture-image" />
                <h2>Welcome to Your Documentation Hub 📚</h2>
                <p>Select a documentation from the list to begin exploring.</p>
                <p>Each document is designed to enhance your knowledge. Dive in when you're ready!</p>
              </div>
            )}
          </div>

          <div className="right">
            {user?.role === "admin" && (
              <button
                className="toggle-form-btn"
                onClick={() => setShow(!show)}
              >
                {show ? "Cancel" : "Add Documentation"}
              </button>
            )}

            {show && (
              <div className="documentation-form">
                <h3>Add New Documentation</h3>
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>PDF File</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={changePdfHandler}
                      required
                    />
                    {pdfPrev && (
                      <div className="pdf-preview">
                        <p>PDF selected: {pdf.name}</p>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={btnLoading}
                    className="submit-btn"
                  >
                    {btnLoading ? "Uploading..." : "Upload Documentation"}
                  </button>
                </form>
              </div>
            )}

            <div className="documentation-list">
              {documentations.length > 0 ? (
                documentations.map((doc, index) => (
                  <div
                    key={doc._id}
                    className={`doc-item ${documentation._id === doc._id ? "active" : ""}`}
                    onClick={() => fetchDocumentation(doc._id)}
                  >
                    <span className="doc-number">{index + 1}.</span>
                    <span className="doc-title">{doc.title}</span>
                    {user?.role === "admin" && (
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHandler(doc._id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-docs">No documentations available</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Documentation;