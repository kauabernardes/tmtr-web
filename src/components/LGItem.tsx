import { type ReactNode } from "react";
import { ListGroupItem, type ListGroupItemProps } from "react-bootstrap";

type LGItemProps = ListGroupItemProps & {
  title: ReactNode;
  description: ReactNode;
};

export const LGItem = ({ title, description, ...props }: LGItemProps) => {
  return (
    <ListGroupItem className="d-flex flex-column p-0" {...props}>
      <h3 className="fs-6 m-0 mt-2">{title}</h3>
      <p className="m-0 mb-2">{description}</p>
    </ListGroupItem>
  );
};
