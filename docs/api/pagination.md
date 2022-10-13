---
sidebar_position: 4
sidebar_label: Pagination
---

# Pagination

Vault uses pagination to improve performance when retrieving objects. 

The default value for the page size is specified in the environment variable `PVAULT_SERVICE_DEFAULT_PAGE_SIZE`. When you request a list of objects, you can use the `page_size` parameter to set the page size as lower than the default value.

The response provides a `results` array containing the object details and a `paging` object with information about the page. For example:

```json
{
  "results": [
    {
      "email": "joe-0-bill@microsoft.com"
    },
    {
      "email": "joe-1-bill@microsoft.com"
    },
    …
  ],
  "paging": {
    "size": 100,
    "remaining_count": 901,
    "cursor": "AXfKgvXQNTZYiFCtBSTHbjkmYXiaE84oxgGzdeQyKXZbbG0sUX7jAwrUeaBIosUeXqYIKw=="
  }
}
```

In the `paging` object:

- `size` is the number of results returned.
- `remaining_count` is the number of items that remain to be returned in subsequent pages.
- `cursor` is a reference to the next page. You use the cursor in a follow-up call like this:
   ```text
   GET api/pvlt/1.0/data/collections/employees/objects?reason=Analytics&props=email&cursor=AXfKgvXQNTZYiFCtBSTHbjkmYXiaE84oxgGzdeQyKXZbbG0sUX7jAwrUeaBIosUeXqYIKw==
   ```
   to obtain the next page.

The final page in a sequence of pages returns `0` for `remaining_count` and no cursor. For example:
```json
{
  ...
  "paging": {
    "size": 1,
    "remaining_count": 0,
    "cursor": ""
  }
}
```
