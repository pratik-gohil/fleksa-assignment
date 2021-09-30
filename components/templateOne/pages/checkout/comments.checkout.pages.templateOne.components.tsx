import { useTranslation } from 'next-i18next';
import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-grid-system';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.redux';
import { selectComment, updateComment } from '../../../../redux/slices/checkout.slices.redux';
import { amplitudeEvent, constructEventName } from '../../../../utils/amplitude.util';
import { StyledCheckoutCard, StyledCheckoutTitle } from './customer-info.checkout.pages.templateOne.components';
import EditButton from './edit-button.checkout.pages.templateOne.components';
import EditContainer from './edit-container.checkout.pages.templateOne.components';

export const StyledCheckoutTextarea = styled.textarea`
  width: 100%;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: ${(props) => props.theme.dimen.X4}px;
  font-family: inherit;
  font-size: inherit;
  height: 76px;
`;

const CheckoutPageComments: FunctionComponent = ({}) => {
  const { t } = useTranslation('page-checkout');
  const dispatch = useAppDispatch();

  const comment = useAppSelector(selectComment);

  const [commentEdit, setCommentEdit] = useState(false);

  /**
   *
   * @returns Update editing state for comment
   */
  const handleEditIconClick = async () => {
    setCommentEdit(!commentEdit);
  };

  return (
    <StyledCheckoutCard>
      <EditContainer>
        <StyledCheckoutTitle>{t('@comments')}</StyledCheckoutTitle>

        <EditButton
          onClick={async () => {
            await handleEditIconClick();

            amplitudeEvent(constructEventName(`comments edit`, 'icon-button'), {
              comment,
            });
          }}
        />
      </EditContainer>

      <Row>
        <Col xs={12}>
          {commentEdit ? (
            <StyledCheckoutTextarea
              value={comment}
              autoFocus
              onBlur={() => {
                setCommentEdit(false);
                amplitudeEvent(constructEventName(`comment `, 'input'), {
                  comment,
                  length: comment.length,
                });
              }}
              onChange={(e) => dispatch(updateComment(e.target.value))}
            />
          ) : (
            <p>{comment}</p>
          )}
        </Col>
      </Row>
    </StyledCheckoutCard>
  );
};

export default CheckoutPageComments;
