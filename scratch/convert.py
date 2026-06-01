import re

def convert_html_to_jsx(html_str):
    # 1. Extract body content
    body_match = re.search(r'<body[^>]*>([\s\S]*?)</body>', html_str, re.IGNORECASE)
    body_content = body_match.group(1) if body_match else html_str

    # 2. Replace class= with className=
    jsx = body_content.replace('class=', 'className=')

    # 3. Self-closing tags
    jsx = re.sub(r'<img([^>]*[^/])>', r'<img\1 />', jsx)
    jsx = re.sub(r'<input([^>]*[^/])>', r'<input\1 />', jsx)
    jsx = re.sub(r'<br\s*>', r'<br />', jsx)
    jsx = re.sub(r'<hr\s*>', r'<hr />', jsx)

    # 4. Transform inline styles
    def style_replacer(match):
        css_str = match.group(1)
        rules = [r.strip() for r in css_str.split(';') if r.strip()]
        style_obj_parts = []
        for rule in rules:
            if ':' not in rule: continue
            k, v = [x.strip() for x in rule.split(':', 1)]
            camel_k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            v_clean = v.replace('"', "'")
            style_obj_parts.append(f'{camel_k}: "{v_clean}"')
        return 'style={{ ' + ', '.join(style_obj_parts) + ' }}'
    jsx = re.sub(r'style="([^"]*)"', style_replacer, jsx)

    # 5. Fix HTML comments
    jsx = re.sub(r'<!--([\s\S]*?)-->', r'{/* \1 */}', jsx)
    return jsx

with open('home.html', 'r', encoding='utf-8') as f:
    home_html = f.read()

with open('faculty.html', 'r', encoding='utf-8') as f:
    faculty_html = f.read()

home_jsx = convert_html_to_jsx(home_html)
faculty_jsx = convert_html_to_jsx(faculty_html)

home_component = f"""import Link from 'next/link';

export default function HomePage() {{
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      {home_jsx}
    </div>
  );
}}
"""

faculty_component = f"""import Link from 'next/link';

export default function FacultyPage() {{
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      {faculty_jsx}
    </div>
  );
}}
"""

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(home_component)

with open('src/app/faculty/page.tsx', 'w', encoding='utf-8') as f:
    f.write(faculty_component)

print("Pages transformed via python!")
