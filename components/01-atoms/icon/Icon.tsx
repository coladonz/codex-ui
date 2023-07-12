// import loadable, { LoadableComponent } from "@loadable/component";
// import { IconType, IconBaseProps } from "react-icons";
// import { BsQuestionDiamond } from "react-icons/bs";

// interface IconProps {
//   name: string;
//   props?: IconBaseProps;
// }

// const Icon = ({ name, props }: IconProps): JSX.Element => {
//   const lib = name
//     .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
//     .split(" ")[0]
//     .toLocaleLowerCase();

//   let IconElement: IconType = BsQuestionDiamond;

//   try {
//     const loadableComponent: LoadableComponent<IconType> = loadable(
//       () => import(`react-icons/${lib}/${name}`),
//       {
//         resolveComponent: (module) => module[name as keyof typeof module],
//       }
//     );
//     IconElement = loadableComponent as unknown as IconType;
//   } catch (err) {
//     console.error(`Error loading icon ${name}`, err);
//   }

//   // or without using loadable
//   //   let IconElement: IconType;
//   //   try {
//   //     const iconModule = require(`react-icons/${lib}/${name}`);
//   //     IconElement = iconModule[name as keyof typeof iconModule];
//   //   } catch (err) {
//   //     console.error(`Error loading icon ${name}`, err);
//   //     IconElement = BsQuestionDiamond;
//   //   }

//   //   const loadableComponent: LoadableComponent<IconType> = loadable(
//   //     () => import(`react-icons/${lib}/${name}`),
//   //     {
//   //       resolveComponent: (module) => module[name as keyof typeof module],
//   //     }
//   //   );

//   //   const IconElement = loadableComponent as unknown as IconType;

//   return <IconElement {...props} />;
// };

// export default Icon;
