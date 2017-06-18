import React from 'react';
import { View, Text } from 'react-native';

import C from '../C';
import T from '../T';
import S from '../styles/styles';
import Pill from '../components/Pill';

export default class UserActivitiesList extends React.Component {
  render() {
    const tags = this.props.tags ? this.props.tags : [];
    const theme = this.props.theme;
    const more = this.props.more;
    const max = this.props.max ? this.props.max : 3;

    return (
      <View style={[{flexDirection:'row', alignItems:'center'}, this.props.styles]}>
        { tags.map((t, i) => {
            if (i < max) {
              return (
                <Pill
                  theme={theme}
                  style={{marginRight:S.spacing.xsmall}}
                  key={t}
                  label={t}
                />
              )
            }
        }) }

        { (tags.length > max) &&
          <Pill
            key='TAGS_LIST_MORE'
            label={`+${tags.length-max}`}
            inversed={true}
          />
        }
      </View>
    );
  }
}
