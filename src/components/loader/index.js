import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loader = ({ showBg }) => {
	return (
		<View
			style={{
				position: "absolute",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor:
					showBg != undefined && showBg == false ? "transparent" : "#000",
				alignItems: "center",
				justifyContent: "center",
				opacity: 0.6,
			}}
		>
			<ActivityIndicator size="large" number={30} />
		</View>
	);
};

export default Loader;
