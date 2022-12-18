import { types as t, PluginObj, PluginPass } from '@babel/core';
import { expandGroups } from 'twind';
import fs from 'fs';
import path from 'path';

const twVariantsPath = path.join(process.cwd(), '.tw-variants', 'cache');

if (fs.existsSync(twVariantsPath)) {
  fs.unlinkSync(twVariantsPath);
}

export default function twVariantsPlugin(): PluginObj<
  PluginPass & { twVariants: { classes: string } }
> {
  return {
    name: 'tw-variants-plugin',
    visitor: {
      Program: {
        enter(_, state) {
          const twState = {
            classes: '',
          };

          state.twVariants = twState;
        },
        exit(_, state) {
          if (state.twVariants.classes.length > 0) {
            fs.appendFileSync(twVariantsPath, state.twVariants.classes, 'utf8');
          }
        },
      },
      TaggedTemplateExpression(path, state) {
        if (t.isIdentifier(path.node.tag) && path.node.tag.name === 'tw') {
          const classes = expandGroups(
            path.node.quasi.quasis.map(q => q.value.raw).join(' ')
          );
          state.twVariants.classes += classes;
          state.twVariants.classes += ' ';
          path.replaceWith(t.stringLiteral(classes));
        }
      },
    },
  };
}
