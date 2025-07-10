import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton, Alert, Tag } from "antd";
import { PlayCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";

export default function RoadMapDetails() {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [level, setLevel] = useState("beginner");
  const [activeSection, setActiveSection] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [progress, setProgress] = useState([]); // holds completed step IDs


  const levels = ["beginner", "intermediate", "advanced"];

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/roadmaps/${id}/${level}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        });
        setRoadmap(response.data);
        console.log(response.data);

        setError("");
        if (response.data?.sections?.length > 0) {
          setActiveSection(response.data.sections[0].id);
        }
      } catch (err) {
        console.error("Error fetching roadmap:", err);
        setError("Failed to load roadmap. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
     const fetchProgress = async () => {
  try {
    const res = await axios.get(`${API}/roadmaps/${id}/progress`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
    setProgress(res.data?.completed_steps || []);
  } catch (err) {
    console.error("Failed to fetch progress:", err);
  }
};

fetchProgress();
  }, [id, level]);
const toggleStepProgress = async (stepId) => {
  try {
    await axios.post(
      `${API}/roadmaps/progress`,
      { stepId: stepId,isCompleted:true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    // Toggle step in local state
    setProgress((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  } catch (err) {
    console.error("Failed to update progress:", err);
  }
};


 

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" style={{ '--primary': '#7D8AC3', '--secondary': '#384579' }}>
      <style>{`
        .primary-bg { background-color: var(--primary); }
        .primary-text { color: var(--primary); }
        .primary-border { border-color: var(--primary); }
        .primary-hover:hover { background-color: var(--primary); opacity: 0.9; }
        .secondary-bg { background-color: var(--secondary); }
        .secondary-text { color: var(--secondary); }
        .secondary-border { border-color: var(--secondary); }
      `}</style>

      <div className="mb-5 text-center mt-5">
        <h3 className="text-3xl font-bold i mb-2">
          {loading ? <Skeleton.Input active /> : roadmap?.title || "Roadmap"}
        </h3>
        <p className="secondary">
          {loading ? (
            <Skeleton paragraph={{ rows: 1 }} />
          ) : (
            roadmap?.description || "Step-by-step learning path"
          )}
        </p>
      </div>

      {/* Level selection tabs */}
      <div className="flex  mb-8">
        <div className="inline-flex rounded-md shadow-sm " role="group">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`px-4 py-2 text-sm font-medium ${
                level === lvl
                  ? "primary-bg text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } ${
                lvl === "beginner" ? "rounded-l-lg" : ""
              } ${
                lvl === "advanced" ? "rounded-r-lg" : ""
              } border border-gray-200 transition-colors`}
            >
              {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-6"
        />
      )}

      {loading && (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton active paragraph={{ rows: 4 }} />
            </div>
          ))}
        </div>
      )}

      {!loading && !error && roadmap && (
        <div className="space-y-6">
          {roadmap.sections.map((section) => (
            <div
              key={section.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <h5 className="text-xl font-semibold text-gray-800">
                  <span className="primary-text mr-2">
                    {section.section_order}.
                  </span>
                  {section.title}
                </h5>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    activeSection === section.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {activeSection === section.id && (
                <div className="p-4 border-t ">
                  <ul className="space-y-4 mb-5">
                    {section.steps.map((step) => (
                   <li key={step.id} className="p-4 bg-white rounded-lg border hover:border-blue-800 transition-colors">
  <div className="flex items-start ">
    <div className="flex-shrink-0 mt-1 me-2">
      {progress.includes(step.id) ? (
        <CheckCircleOutlined className="text-green-600" />
      ) : (
        <CheckCircleOutlined className="text-gray-400" />
      )}
    </div>
    <div className="flex-1 ">
      <h5 className="text-lg font-medium text-gray-800">
        {step.step_order}. {step.title}
      </h5>
      <p className="text-gray-600 mt-1 mb-3">{step.description}</p>
      <div className="mb-3">
        <span className="font-medium text-gray-700 mr-2">Skills:</span>
        {step.skills_covered.map((skill) => (
          <Tag key={skill} className="primary-bg text-white mr-2 mb-2 py-1">
            {skill}
          </Tag>
        ))}
      </div>
      {step.resource_link && (
        <a
          href={step.resource_link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center primary-text text-decoration-none"
        >
          <PlayCircleOutlined className="mr-2" />
          Watch Resource
        </a>
      )}

<div className="Done d-flex justify-content-end">
<button
        onClick={() => toggleStepProgress(step.id)}
        className={`mt-3 px-3 py-1 text-sm justify-items-end font-semibold rounded ${
          progress.includes(step.id)
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {progress.includes(step.id) ? "✓ Done" : "Mark as Done"}
      </button>
</div>
      
    </div>
  </div>
</li>

                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}