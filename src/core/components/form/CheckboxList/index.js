import React from "react";
import styled from "styled-components";
import { compose, withState } from "recompose";
import { colors } from "core/theme";
import Checkbox from "./Checkbox";
import Error from "../Error";

const Body = styled.div`
  padding-left: calc(1.625rem + 2px);
  position: relative;
  margin-bottom: 0.75rem;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0.625rem;
    width: 1px;
    height: 100%;
    background-color: ${colors.heavyGray};
  }
`;

const Item = styled.div`
  margin-bottom: 0.375rem;
  &:last-child {
    margin-bottom: 0;
  }
  &:last-child ${Body} {
    margin-bottom: 0;
  }
`;

export default compose(withState("openedIndex", "setOpenedIndex", void 0))(
  ({
    field: { value = [], onChange, name } = {},
    form: { values, setValues, touched, errors } = {},
    items,
    openedIndex,
    setOpenedIndex
  }) => (
    <div>
      {items.map(({ title, items }, i) => (
        <Item key={i}>
          <Checkbox
            onClick={() => setOpenedIndex(openedIndex !== i ? i : void 0)}
            isPartial={hasSelected(value, items)}
            title={title}
          />
          {openedIndex === i && (
            <Body>
              {items.map((item, i) => (
                <Checkbox
                  onClick={() =>
                    setValues({
                      ...values,
                      [name]: toggle(value, item.name)
                    })
                  }
                  key={i}
                  title={item.title}
                  isActive={value.includes(item.name)}
                />
              ))}
            </Body>
          )}
        </Item>
      ))}
      {touched[name] && errors[name] && <Error>{errors[name]}</Error>}
    </div>
  )
);

const hasSelected = (list, items) =>
  items.filter(({ name }) => list.includes(name)).length > 0;

const toggle = (list, item) =>
  list.includes(item) ? list.filter(i => item !== i) : [...list, item];
