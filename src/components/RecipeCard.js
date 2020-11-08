import React, { useState, useRef } from 'react';
import firebase from "../utils/firebase";
import moment from "moment";
import ShowMoreText from 'react-show-more-text';
import Popup from 'reactjs-popup';
import { addItems, deleteEntry, removeItems, updateItem } from "../helpers/functions";

const Card = ({ docID, title, imgSrc, author, description, timestamp, hasMade, notes, tags, url }) => {

    const [tagsToAdd, setTagsToAdd] = useState("");
    const [notesToAdd, setNotesToAdd] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const add = (e, field) => {
        e.preventDefault();
        setIsEditing(false);

        switch (field) {
            case "tags":
                let newTags = tagsToAdd;
                if (newTags.length) {
                    if (newTags.length === 1) {
                        addItems(docID, "tags", newTags);
                    } else {
                        newTags = newTags.split(",")
                        newTags.forEach(tag => {
                            addItems(docID, "tags", tag);
                        });
                    }
                    setTagsToAdd("");
                }
                break;
            case "notes":
                let newNotes = notesToAdd
                if (newNotes.length) {
                    let newNotes = notesToAdd.split("\n\n");
                    newNotes.forEach(note => {
                        addItems(docID, "notes", note);
                    });
                    setNotesToAdd("");
                }
                break;
            default:
                break;
        }
    }

    const remove = (e, field) => {
        e.preventDefault();
        let itemToRemove = e.target.closest("li").textContent.slice(0, -1);

        switch (field) {
            case "tags":
                removeItems(docID, "tags", itemToRemove)
                break;
            case "notes":
                removeItems(docID, "notes", itemToRemove)
                break;
            default:
                break;
        }
    }

    return (
        <div className="card">
            <div className="card-top">
                <img src={imgSrc} />
                <Popup trigger={<span className="delete"></span>} modal>
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>X</button>
                            <div className="header">Are You Sure that You Want to Delete this Recipe???</div>
                            <button className="delete" onClick={() => deleteEntry(docID)}>Delete this Recipe Entry</button>
                        </div>
                    )}
                </Popup>
            </div>
            <div className="card-bottom">
                <div className="title-wrapper">
                    <h3>{title}</h3>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" className="has-made" name="has-made"
                            value={hasMade}
                            onChange={() => console.log("click")}
                            checked={hasMade}
                        />
                        <label
                            htmlFor="has-made"
                            onClick={() => updateItem(docID, hasMade)}
                        >
                            Cooked
                        </label>
                    </div>
                </div>
                <p>Author: <strong><em>{author.length ? author : "No Assigned Author"}</em></strong></p>
                <div className="description">
                    <ShowMoreText
                        lines={5}
                        more='Show more'
                        less='Show less'
                        anchorClass='description-anchor'
                        expanded={false}
                        width={0}
                    >
                        {description}
                    </ShowMoreText>
                </div>
                <div>
                    <div className="tags-header">
                        <p><strong>Tagged As:</strong></p>
                        {isEditing ? (
                            <form
                                onSubmit={e => add(e, "tags")}
                            >
                                <textarea
                                    name="tags"
                                    placeholder="Enter ',' separated tags"
                                    rows="2"
                                    value={tagsToAdd}
                                    onChange={e => setTagsToAdd(e.target.value)}
                                />
                                <button
                                    type="submit"
                                >{tagsToAdd.length > 0 ? "Submit" : "Close"}</button>
                            </form>
                        ) : (
                                <p className="add" onClick={() => setIsEditing(true)}>+</p>
                            )}
                    </div>
                    {tags.length > 0 ?
                        (
                            <ul className="tags">
                                {tags.map((tag, i) => (
                                    <li
                                        key={docID + i}
                                    >{tag}
                                        <div className="delete-tag" onClick={(e) => remove(e, "tags")}>
                                            <span>x</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                        : (
                            <p>This recipe has not been tagged yet</p>
                        )
                    }
                </div>
                <div>
                    <Popup trigger={
                        notes.length > 0 ? (
                            <div className="see-notes note">See Notes</div>
                        ) : (
                                <div className="make-notes note">Make a Note</div>
                            )
                    } modal>
                        {close => (
                            <div className="modal notes-modal">
                                <button className="close" onClick={close}>X</button>
                                <div className="header">{title} Notes</div>
                                <div className="content">
                                    {notes.length > 0 ? (
                                        <ol>
                                            {notes.map(note => (
                                                <li
                                                    key={note}
                                                >{note}
                                                    <div className="delete-note" onClick={(e) => remove(e, "notes")}>
                                                        <span>x</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ol>
                                    ) : (
                                            <p>There are no notes for this recipe yet.</p>
                                        )}
                                </div>
                                <div className="actions">
                                    <form
                                        onSubmit={e => add(e, "notes")}
                                    >
                                        <textarea
                                            name="notes"
                                            placeholder="Add additional notes here."
                                            rows="5"
                                            value={notesToAdd}
                                            onChange={e => setNotesToAdd(e.target.value)}
                                        />
                                        <button type="submit">Add Note</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                <div className="link">
                    <a href={url} target="_blank">Recipe Link</a>
                </div>
                <span className="timestamp">Saved On: {moment(timestamp).format("MMMM Do YYYY")}</span>
            </div>
        </div>
    );
}

export default Card;