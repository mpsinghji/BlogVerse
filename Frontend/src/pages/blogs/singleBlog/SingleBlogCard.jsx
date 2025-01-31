import React from "react";
import { formatDate } from "../../../utils/formatDate";
import EditorJSHTML from "editorjs-html";

const editorJSHTML = EditorJSHTML();

const SingleBlogCard = ({ blogs }) => {
  const {
    title,
    description,
    content,
    coverImg,
    category,
    rating,
    author,
    createdAt,
  } = blogs || {};
  const editorJSHTML = EditorJSHTML();
  const htmlContent = editorJSHTML.parse(content);

  return (
    <>
      <div className="bg-white p-8">
        <div>
          <h1 className="md:text-4xl text-3xl font-medium mb-4 ">{title}</h1>
          {/* TODO */}
          <p className="mb-6">
            {formatDate(createdAt)} by{" "}
            <span className="text-blue-400 cursor-pointer">
              {author?.username}{" "}
            </span>
          </p>
        </div>
        <div>
          <img
            src={coverImg}
            alt="cover Image"
            className="w-full md:h-[520px] bg-cover"
          />
        </div>
        <div className="mt-8 space-y-4">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="space-y-3 editorjsdiv"
          />
          <div>
            <span className="text-lg font-medium">Rating: </span>
            <span>{rating} (based on 2370 reviews)</span>
          </div>
          <h3 className="text-lg font-medium">Key Features</h3>
        </div>
      </div>
    </>
  );
};

export default SingleBlogCard;
