import { CircleUser } from "lucide-react";
import React from "react";

const comments = [
  { name: "Alice", text: "This is a great post!" },
  { name: "Bob", text: "I found this article very helpful." },
  { name: "Charlie", text: "Thanks for sharing this information." },
  { name: "David", text: "I have a question about the last point." },
  { name: "Eve", text: "Can you provide more details on this topic?" },
  { name: "Frank", text: "I completely agree with your opinion." },
  { name: "Grace", text: "This is a very insightful read." },
  { name: "Hank", text: "I disagree with some points mentioned here." },
  { name: "Ivy", text: "Could you elaborate on the third paragraph?" },
  { name: "Jack", text: "This was a bit confusing to me." },
  { name: "Kara", text: "Great job! Keep up the good work." },
  { name: "Leo", text: "I learned a lot from this article." },
  { name: "Mia", text: "Can you recommend more resources on this topic?" },
  { name: "Nina", text: "This is exactly what I was looking for!" },
  { name: "Oscar", text: "I don't think this is entirely accurate." },
  { name: "Paul", text: "Fantastic write-up!" },
  { name: "Quinn", text: "I have a different perspective on this issue." },
  { name: "Rose", text: "Very well explained." },
  { name: "Sam", text: "Could you update this post with recent data?" },
  { name: "Tina", text: "I appreciate the effort put into this." },
];

function Comments() {
  return (
    <section className="flex justify-start items-start flex-col my-10 w-[27rem] gap-4">
      <h3 className="text-black font-black text-2xl ml-10 self-start">
        Comments
      </h3>
      <p className="ml-10 self-start ">
        Share your thoughts and feedback on this product.
      </p>
      {comments.slice(0, 10).map((item, index) => (
        <article
          key={index}
          className="flex justify-center items-center gap-4 ml-8"
        >
          <CircleUser className="size-8 text-gray-500" />
          <div className="flex flex-col justify-center items-start">
            <div className="flex gap-4 justify-start items-center">
              <p className="font-black">{item.name}</p>
              <p className="text-xs">2 Days ago</p>
            </div>
            <p className="text-sm">{item.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Comments;
