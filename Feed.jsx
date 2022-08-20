import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Spinner, MasoryLayout } from "../components";
import { searchQuery, feedQuery } from "../utils/data";
import { client } from "../client";

function Feed() {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams;

  useEffect(() => {
    setLoading(true);
    const query = searchQuery(categoryId);
    if (categoryId) {
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  console.log(pins);

  if (loading)
    return <Spinner message="we are adding new items to your Feed" />;
  return <div>{pins && <MasoryLayout pins={pins} />}</div>;
}

export default Feed;
