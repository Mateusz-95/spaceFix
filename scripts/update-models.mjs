import fs from 'node:fs';
import ts from 'typescript';

const files = [
    'src/data/iphone/models.ts',
    'src/data/samsung/models.ts',
    'src/data/google/models.ts',
    'src/data/xiaomi/models.ts',
    'src/data/iPad/models.ts',
    'src/data/appleWatch/models.ts',
];

function generateRepairEntry(key, title, shortTitle) {
    return `      {
        key: '${key}',
        title: '${title.replace(/'/g, "\\'")}',
        shortTitle: '${shortTitle}',
        price: 'Wycena telefoniczna',
        description:
          'Skontaktuj się z nami telefonicznie - przygotujemy indywidualną wycenę tej naprawy dla Twojego modelu.',
        duration: '3-4 godziny',
      },`;
}

for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS
    );

    const replacements = [];

    function visit(node) {
        if (ts.isObjectLiteralExpression(node)) {
            const nameProp = node.properties.find(
                (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'name'
            );
            const repairsProp = node.properties.find(
                (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'repairs'
            );

            if (
                nameProp &&
                repairsProp &&
                ts.isStringLiteral(nameProp.initializer) &&
                ts.isArrayLiteralExpression(repairsProp.initializer)
            ) {
                const modelName = nameProp.initializer.text;
                const repairsArray = repairsProp.initializer;

                const existingKeys = new Set();
                for (const elem of repairsArray.elements) {
                    if (ts.isObjectLiteralExpression(elem)) {
                        const keyProp = elem.properties.find(
                            (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'key'
                        );
                        if (keyProp && ts.isStringLiteral(keyProp.initializer)) {
                            existingKeys.add(keyProp.initializer.text);
                        }
                    }
                }

                const toAdd = [];
                if (!existingKeys.has('charging-port')) {
                    toAdd.push(
                        generateRepairEntry(
                            'charging-port',
                            `${modelName} naprawa złącza ładowania`,
                            'Złącze ładowania'
                        )
                    );
                }
                if (!existingKeys.has('motherboard')) {
                    toAdd.push(
                        generateRepairEntry(
                            'motherboard',
                            `${modelName} naprawa płyty głównej`,
                            'Płyta główna'
                        )
                    );
                }

                if (toAdd.length > 0) {
                    // Find closing bracket `]` index
                    const arrayEnd = repairsArray.end; // position right after `]`
                    const closeBracketIdx = content.lastIndexOf(']', arrayEnd);

                    if (repairsArray.elements.length > 0) {
                        const lastElem = repairsArray.elements[repairsArray.elements.length - 1];
                        replacements.push({
                            start: lastElem.end,
                            end: closeBracketIdx,
                            text: ',\n' + toAdd.join('\n') + '\n    ',
                        });
                    } else {
                        const openBracketIdx = content.indexOf('[', repairsArray.pos);
                        replacements.push({
                            start: openBracketIdx + 1,
                            end: closeBracketIdx,
                            text: '\n' + toAdd.join('\n') + '\n    ',
                        });
                    }
                }
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    // Sort replacements in reverse order of start position
    replacements.sort((a, b) => b.start - a.start);

    for (const r of replacements) {
        content = content.slice(0, r.start) + r.text + content.slice(r.end);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}: applied ${replacements.length} updates`);
}



