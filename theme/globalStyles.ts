import {

    ViewStyle,
 
  } from "react-native";
import { Layout } from "../constants";
  import { colors} from "./colors";

export const globalStyles = {
    CARDROW: ViewStyle = {
        marginTop: 20,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.03,
        // elevation: 1,
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
      },
    ButtonStyle: ViewStyle = {
        backgroundColor: colors.alerzoBlue,
        padding: 15,
        borderRadius: 10,
        borderColor: colors.alerzoBlue,
        borderWidth: 1,
        width: Layout.window.width / 1.1,
        alignSelf: "center",
      },
        BottomView: ViewStyle = {
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        width: '100%',
        marginBottom: 16
      }
 
}
export type GlobalStylesTypes = keyof typeof globalStyles
