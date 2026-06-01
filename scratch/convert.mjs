import fs from 'fs';
import path from 'path';

function convertHtmlToJsx(htmlStr) {
    // 1. Extract the body content (ignoring the scripts and head)
    let bodyMatch = htmlStr.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : htmlStr;

    // 2. Replace class= with className=
    let jsx = bodyContent.replace(/class=/g, 'className=');

    // 3. Make sure all <img, <input, <br, <hr are self closing
    jsx = jsx.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
    jsx = jsx.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
    jsx = jsx.replace(/<br\s*>/g, '<br />');
    jsx = jsx.replace(/<hr\s*>/g, '<hr />');

    // 4. Transform inline styles. E.g., style="font-variation-settings: 'FILL' 1;" -> style={{ fontVariationSettings: "'FILL' 1" }}
    jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
        const styleObjStr = p1.split(';').filter(s => s.trim()).map(rule => {
            const [key, val] = rule.split(':').map(s => s.trim());
            if(!key) return '';
            const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
            return `${camelKey}: "${val.replace(/"/g, "'")}"`;
        }).join(', ');
        return `style={{ ${styleObjStr} }}`;
    });

    // 5. svg props fix if any (not strictly needed for material icons as they are spans)
    // 6. fix <!-- --> to {/* */}
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

    return jsx;
}

const homeHtml = fs.readFileSync('home.html', 'utf8');
const facultyHtml = fs.readFileSync('faculty.html', 'utf8');

const homeJsx = convertHtmlToJsx(homeHtml);
const facultyJsx = convertHtmlToJsx(facultyHtml);

const homeComponent = `
export default function HomePage() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      ${homeJsx}
    </div>
  );
}
`;

const facultyComponent = `
export default function FacultyPage() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      ${facultyJsx}
    </div>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', homeComponent.trim() + '\n');
fs.writeFileSync('src/app/faculty/page.tsx', facultyComponent.trim() + '\n');

console.log("Pages generated successfully!");
