import React from "react";
import styled from "styled-components";
import { compose, withState } from "recompose";
import { Error } from "core/components/form";
import Checkbox from "./Checkbox";
import Repos from "./Repos";

const Item = styled.div`
  margin-bottom: 0.375rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

export default compose(withState("openedIndex", "setOpenedIndex", void 0))(
  ({
    field: { value: selected = [], onChange, name } = {},
    form: { values, setValues, touched, errors } = {},
    orgs,
    openedIndex,
    setOpenedIndex
  }) => (
    <div>
      {orgs.map(({ login }, i) => (
        <Item key={i}>
          <Checkbox
            onClick={() => setOpenedIndex(openedIndex !== i ? i : void 0)}
            isPartial={hasSelected(selected, login)}
            title={login}
          />
          {openedIndex === i && (
            <Repos
              org={login}
              selected={selected}
              onCheck={id =>
                setValues({
                  ...values,
                  [name]: toggle(selected, id)
                })
              }
            />
          )}
        </Item>
      ))}
      {touched[name] && errors[name] && <Error>{errors[name]}</Error>}
    </div>
  )
);

const hasSelected = (selected, org) =>
  selected.filter(repo => repo.slice(0, org.length) === org).length > 0;

const toggle = (selected, id) =>
  selected.includes(id) ? selected.filter(i => id !== i) : [...selected, id];
