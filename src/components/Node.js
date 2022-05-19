import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../constants/colors";
import { Paper, Subtitle, BodyText, Caption } from "material-bread";
import { Expander } from "./Expander";
import Status from "./Status";

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  console.log(node)
  return (
    <TouchableOpacity onPress={() => toggleNodeExpanded(node)}>
      <Paper elevation={2} style={styles.container}>
        <View style={styles.headingContainer}>
          <Subtitle
            type={6}
            text={node.name || "Unknown"}
            style={styles.heading}
          />
          <Status loading={node.loading} online={node.online} />
        </View>
        <Caption
          text={node.url}
          color={colors.gray}
          style={styles.secondaryHeading}
        />
        <Expander expanded={expanded} style={styles.icon(expanded)} />
        {expanded && (
          <View style={styles.heading}>
            {node?.block?.map(block =>
              <View key={block.id} style={styles.blockHeading}>
                  <BodyText type={1} text={`00${block.id}`}  style={styles.blockNumber}/>
                <BodyText type={1} text={block.attributes?.data} />
              </View>
            )
            }

          </View>
        )}
      </Paper>
    </TouchableOpacity>
  )
};

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
    block: PropTypes.array
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 30
  },
  heading: {
    marginTop: 5,
    color: colors.text
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingEnd: 30,
    alignItems: "center",
    width: "100%"
  },
  secondaryHeading: {
    marginTop: 5,
    color: colors.faded
  },

  // New css added by Chiedu
  blockHeading: {
    backgroundColor: colors.blocks,
    paddingVertical: 5,
    marginTop: 5,
    borderRadius: 3,
    paddingHorizontal: 5
  },
  blockNumber:{
    color: colors.purple,
    fontSize: 12,
    marginBottom: 8
  },

  icon: expanded => ({
    position: "absolute",
    top: expanded ? 10 : 20,
    right: 10
  })
});

export default Node;
