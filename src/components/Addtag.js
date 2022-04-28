import React from "react";


const Addtag = (props) => {
  const [tags, setTags] = React.useState([])
  const addTags = (e) => {
    if(e.key === "Enter" && e.target.value != ""){
      setTags([...tags, e.target.value]);
      props.selectedTags([...tags, e.target.value]);
      e.target.value = "";
    }
  }
  const removeTags = (index) => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)])
  }

  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span>{tag}</span>
            <i className="tag-close-icon" onClick={() => removeTags(index)}> X </i>
          </li>
        ))}
      </ul>
      <input 
        type="text" 
        placeholder="Press enter to add tags"
        onKeyUp = {e => addTags(e)}
      />
    </div>
  );
}

export default Addtag;