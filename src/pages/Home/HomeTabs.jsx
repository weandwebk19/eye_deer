// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { getJoinedGroups, getOwnedGroups } from "httpClient";

// import StyledTabs from "../../components/Tabs/StyledTabs";

// const HomeTabs = () => {
//   const [tabElements, setTabElements] = useState([]);
//   const dispatch = useDispatch();
//   const currentUser = useSelector((state) => state.auth.login.currentUser);
//   useEffect(() => {
//     (async () => {
//       try {
//         const ownedGroups = await getOwnedGroups(currentUser, dispatch);
//         const joinedGroups = await getJoinedGroups(currentUser, dispatch);
//         const newTabElements = [];
//         newTabElements.push({
//           title: "my groups",
//           content: ownedGroups,
//         });
//         newTabElements.push({
//           title: "joined groups",
//           content: joinedGroups,
//         });

//         setTabElements(newTabElements);
//       } catch (e) {
//         console.log(e);
//       }
//     })();
//   }, []);

//   return <StyledTabs tabElements={tabElements} />;
// };

// export default HomeTabs;
