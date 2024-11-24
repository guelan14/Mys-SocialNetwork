import React, { useEffect, useState, useRef } from "react";
import publicationService from "../services/publication";
import Publication from "./publication";

export default function ScrollInfinite({ user, getFeed }) {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(OnIntersection);
    if (observer && elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (observer) observer.disconnect;
    };
  }, [page]);

  const OnIntersection = async (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) await getData(page);
  };

  const getData = async (pagina) => {
    try {
      console.log("pagina anterior", pagina);
      const res = await getFeed(pagina);
      if (res.length === 0) setHasMore(false);
      else {
        setPosts(posts.concat(res));
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (postId) => {
    // Filtrar las publicaciones y actualizar el estado
    setPosts(posts.filter((post) => post._id !== postId));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {posts.map((post) => {
        return (
          <Publication
            key={post._id}
            post={post}
            user={user._id}
            onDelete={handleDelete}
          />
        );
      })}
      {hasMore && <p ref={elementRef}> CARGANDOO</p>}
    </div>
  );
}
