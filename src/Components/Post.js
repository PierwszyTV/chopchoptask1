import React, {useState} from 'react';
import styles from './Post.module.scss';
import SplitText from 'react-pose-text';
import AuthorModal from './AuthorModal';
import Link from 'next/link';

const Post = props => {

    const {id, title, excerpt, date, thumbnail, view, authorId} = props;
    const [excerptOpen, setExcerpt] = useState(false);
    const [infoOpen, setInfo] = useState(false);

    const charPoses = {
        exit: { opacity: 0, y: 10 },
        enter: {
            opacity: 1,
            y: 0,
            delay: ({ charIndex }) => charIndex * 5
        }
    };

    return(
        <article
            className={`${styles.container} ${view === "grid" ? styles.grid : ''}`}
        >
            <div className={styles.innerContainer}>
                <img
                    style={{
                        order: view === "grid" ? 1 : 0
                    }}
                    src={thumbnail}
                    alt={`Thumbnail for ${title}`}
                    className={styles.thumbnail}
                />
                <div>
                    {view !== "grid" && <small>{date}</small>}
                    <h2>
                        <Link
                            href={`/post/${id}`}
                            as={`/post/${id}`}
                        >
                            <a
                                href={`/post/${id}`}
                                className="text-dark"
                            >
                                {title}
                            </a>
                        </Link>
                    </h2>
                </div>
                {view === "list" && (
                    <div className={styles.buttons}>
                        <button
                            type="button"
                            onClick={() => setExcerpt(!excerptOpen)}
                            className="btn btn-sm btn-dark m-2 py-1 px-2"
                        >
                            e
                        </button>
                        <button
                            type="button"
                            onClick={() => setInfo(!infoOpen)}
                            className="btn btn-sm btn-dark m-2 py-1 px-2"
                        >
                            i
                        </button>
                    </div>
                )}
            </div>
            {excerptOpen && (
                <div className={styles.excerpt}>
                    <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
                        {excerpt}
                    </SplitText>
                </div>
            )}
            {infoOpen && view === "list" && <AuthorModal authorId={authorId} close={() => setInfo(false)}/>}
        </article>
    )
}

export default Post;