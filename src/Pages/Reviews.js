import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import "./Reviews.css";

const FILTERS = ["all", "pending", "approved", "rejected"];

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: "", review: "" });
  const [savingId, setSavingId] = useState(null);

  const loadReviews = async () => {
    setError("");
    try {
      const res = await axios.get(`${API_URL}/api/reviews`);
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("Could not load reviews. Check the backend URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const updateReview = async (id, updates) => {
    setSavingId(id);
    setError("");
    try {
      const res = await axios.patch(`${API_URL}/api/reviews/${id}`, updates);
      setReviews((current) =>
        current.map((item) => (item._id === id ? res.data : item))
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Could not update this review.");
    } finally {
      setSavingId(null);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setDraft({ name: item.name, review: item.review });
  };

  const visible = reviews.filter((item) =>
    filter === "all" ? true : item.request === filter
  );

  return (
    <div className="reviews-admin">
      <div className="reviews-admin-top">
        <button className="reviews-back" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h1>Reviews</h1>
        <p>New reviews stay pending until you approve them.</p>
      </div>

      <div className="reviews-filters">
        {FILTERS.map((status) => (
          <button
            key={status}
            className={filter === status ? "active" : ""}
            onClick={() => setFilter(status)}
          >
            {status}
            <span>
              {status === "all"
                ? reviews.length
                : reviews.filter((item) => item.request === status).length}
            </span>
          </button>
        ))}
      </div>

      {error && <p className="reviews-error">{error}</p>}
      {loading && <p className="reviews-empty">Loading reviews...</p>}

      {!loading && visible.length === 0 && (
        <p className="reviews-empty">No {filter === "all" ? "" : filter} reviews yet.</p>
      )}

      <div className="reviews-list">
        {visible.map((item) => {
          const isEditing = editingId === item._id;
          const busy = savingId === item._id;

          return (
            <article key={item._id} className="review-admin-card">
              <div className="review-admin-head">
                <span className={`status status-${item.request}`}>{item.request}</span>
                {item.createdAt && (
                  <time dateTime={item.createdAt}>
                    {new Date(item.createdAt).toLocaleString()}
                  </time>
                )}
              </div>

              {isEditing ? (
                <>
                  <label>
                    Name
                    <input
                      value={draft.name}
                      onChange={(e) =>
                        setDraft((current) => ({ ...current, name: e.target.value }))
                      }
                    />
                  </label>
                  <label>
                    Review
                    <textarea
                      rows="4"
                      value={draft.review}
                      onChange={(e) =>
                        setDraft((current) => ({ ...current, review: e.target.value }))
                      }
                    />
                  </label>
                </>
              ) : (
                <>
                  <h2>{item.name}</h2>
                  <p>{item.review}</p>
                </>
              )}

              <div className="review-admin-actions">
                {isEditing ? (
                  <>
                    <button
                      className="save"
                      disabled={busy}
                      onClick={() =>
                        updateReview(item._id, {
                          name: draft.name,
                          review: draft.review,
                        })
                      }
                    >
                      {busy ? "Saving..." : "Save"}
                    </button>
                    <button className="ghost" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="ghost" onClick={() => startEdit(item)}>
                    Edit
                  </button>
                )}

                {item.request !== "approved" && (
                  <button
                    className="approve"
                    disabled={busy}
                    onClick={() => updateReview(item._id, { request: "approved" })}
                  >
                    Approve
                  </button>
                )}
                {item.request !== "rejected" && (
                  <button
                    className="reject"
                    disabled={busy}
                    onClick={() => updateReview(item._id, { request: "rejected" })}
                  >
                    Reject
                  </button>
                )}
                {item.request !== "pending" && (
                  <button
                    className="ghost"
                    disabled={busy}
                    onClick={() => updateReview(item._id, { request: "pending" })}
                  >
                    Mark pending
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
