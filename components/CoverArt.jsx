export default function CoverArt({ cover, title, onClick }){
  return (
    <div id="cover-art" onClick={onClick}>
      {cover ?(
        <img
          src={cover}
          alt={title}
          style={{ width: '100%', maxWidth: '300px'}}
        />):null}
    </div>
  );
}