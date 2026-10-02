from html.parser import HTMLParser


class Element:
    def __init__(self, tag='', attrs=None):
        self.tag = tag
        self.attrs = dict(attrs or [])
        self.children = []

    def text(self):
        return ' '.join(' '.join(c.text() if isinstance(c, Element) else c for c in self.children).split())

    def find(self, predicate):
        found = []
        for child in self.children:
            if isinstance(child, Element):
                if predicate(child):
                    found.append(child)
                found.extend(child.find(predicate))
        return found


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.root = Element()
        self.stack = [self.root]
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        # HTML allows omitted closing </li> tags. End a sibling item as a browser would.
        if tag == 'li' and self.stack[-1].tag == 'li':
            self.stack.pop()
        element = Element(tag, attrs)
        self.stack[-1].children.append(element)
        if tag not in ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']:
            self.stack.append(element)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                self.stack = self.stack[:index]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)

    def by_id(self, element_id):
        return next(iter(self.root.find(lambda e: e.attrs.get('id') == element_id)), Element())
