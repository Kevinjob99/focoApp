import T from '../T'

const spacing = {
  normal: 16,
  small: 8,
  xsmall: 4,
  large: 24,
  xlarge: 32,
  none: 0,
}

export default styles = {
  // statusBarStyle: 'light-content',
  statusBarStyle: 'dark-content',

  // grids and spacing
  spacing: spacing,

  // text styles
  text: {
    hero: {
      fontWeight: T.fonts.heavyWeight,
      fontSize: T.fonts.xlargeSize,
    },
    title: {
      fontWeight: T.fonts.heavyWeight,
      fontSize: T.fonts.largeSize,
    },
    subtitle: {
      fontWeight: T.fonts.boldWeight,
      fontSize: T.fonts.normalSize,
    },
    normal: {
      fontWeight: T.fonts.normalWeight,
      fontSize: T.fonts.normalSize,
    },
    pill: {
      fontSize: T.fonts.smallSize,
      fontWeight: T.fonts.boldWeight,
    }
  },

  markdown: {
    paragraph: {
      fontSize: T.fonts.normalSize,
      fontWeight: T.fonts.normalWeight,
    },
    link: {
      color: T.colors.accent,
    },
    heading1: {
      fontSize: T.fonts.largeSize,
      fontWeight: T.fonts.boldWeight,
    },
    heading2: {
      fontSize: T.fonts.normalSize,
      fontWeight: T.fonts.boldWeight,
    },
  },

  containers: {
    screen: {
      flex: 1,
      backgroundColor: T.colors.containerBackground,
    },
    hero: {
      padding: spacing.normal
    },
    carousel: {
      padding: spacing.normal,
      paddingTop: 0,
      paddingBottom: 0
    },
    list: {
      padding: spacing.normal,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexRowWrapped: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
  },

  cards: {
    card: {
      borderColor: T.colors.contentBorder,
      backgroundColor: T.colors.contentBackground,
      borderWidth: 0.5,
    },
    raised: {
      shadowColor: T.colors.shadow,
      shadowOffset: {
        width: 0,
        height: spacing.xsmall,
      },
      shadowRadius: spacing.xsmall,
      shadowOpacity: 0.2,
    },
  },

  corners: {
    rounded: {
      borderRadius: spacing.xsmall/2,
    },
    roundedSmall: {
      borderRadius: spacing.xsmall/4,
    },
    roundedLarge: {
      borderRadius: spacing.small,
    },
  },

  // navigation header styles
  header: {
    backTitle: null,
    tintColor: T.colors.app,
    titleStyle: {
      fontWeight: T.fonts.boldWeight,
      color: T.colors.app,
    },
    style: {
      backgroundColor: T.colors.headerBackground,
      borderBottomWidth: 0,
    },
  },
  // titleBanner: {
  //   fontSize: T.fonts.normalSize,
  //   fontWeight: T.fonts.normalWeight,
  //   color: T.colors.inverseText,
  //   backgroundColor: T.colors.translucentWhite,
  //   marginBottom: spacing.small,
  // },
}
