import React, { useEffect, useState } from "react";
import { getRecommendations } from "../utils/api";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await getRecommendations();
        setRecommendations(res.data.recommendations);
      } catch(err) {
        console.error(err);
      }
    };
    fetchRecommendations();
  }, []);

  // Set color based on percent
  const getClass = (percent) => {
    if(percent > 50) return "recommendation high-spend";
    if(percent > 30) return "recommendation medium-spend";
    return "recommendation"; // low spend
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Spending Recommendations</h3>
      {recommendations.length > 0 ? (
        <div>
          {recommendations.map((rec, idx) => (
            <div key={idx} className={getClass(rec.percent)}>
              {rec.message}
            </div>
          ))}
        </div>
      ) : <p>No recommendations yet.</p>}
    </div>
  );
};

export default Recommendations;
