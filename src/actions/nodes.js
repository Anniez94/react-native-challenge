import * as types from "../constants/actionTypes";

const checkNodeStatusStart = node => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res
  };
};

const checkNodeStatusFailure = node => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node
  };
};

export function checkNodeStatus(node) {
  return async dispatch => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      const resBlock = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
      }

      const json = await res.json();

      const blockJson = await resBlock.json();

      const statusBlockMerge = Object.assign(json, blockJson);

      dispatch(checkNodeStatusSuccess(node, statusBlockMerge));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return dispatch => {
    list.forEach(node => {
      dispatch(checkNodeStatus(node));
    });
  };
}
