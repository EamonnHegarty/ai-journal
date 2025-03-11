type params = {
  entry: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string;
  };
};

const EntryCard = ({ entry }: params) => {
  return <div>{entry.id}</div>;
};

export default EntryCard;
