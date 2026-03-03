# Making site inquiries stand out in Gmail

All contact links on the site now use **nathanielbaldock@gmail.com** and pre-fill the subject line so you can filter and prioritize these messages.

## What the site does

- **Speaking page** “Email” button: opens mail with subject  
  **Speaking / Consulting inquiry - nathanielbaldock.com**
- **Footer “Contact”** (landing, speaking, resources): opens mail with subject  
  **Inquiry - nathanielbaldock.com**

So any email someone starts from the site will have a subject containing **nathanielbaldock.com**. (Note: this only affects emails that visitors *start* by clicking a link. Intake form submissions are sent by your server; see your backend to set their subject line.)

## Gmail filter: label and star site inquiries

1. In Gmail, click **Search** (magnifying glass) and open **Show search options**.
2. In **Subject**, enter: `nathanielbaldock.com`
3. Click **Create filter**.
4. Choose what to do with matching messages, for example:
   - **Apply label:** e.g. “Website” or “Inquiries” (create the label if needed)
   - **Star it:** e.g. “Important” star so they stand out in the inbox
   - **Mark as important** (if you use Gmail Priority Inbox)
   - **Never send to Spam**
5. Optionally check **Also apply filter to matching conversations** to label/star existing threads.
6. Click **Create filter**.

After this, any new message whose subject contains “nathanielbaldock.com” will get the label/star/importance you chose.

## Optional: server-side intake emails

If your **intake form** sends you an email (e.g. from your backend or a form service), set that email’s subject to something like:

**New inquiry - nathanielbaldock.com - [Consulting/Speaking]**

Then the same Gmail filter above will catch those as well, so all site-related inquiries are in one place and can be labeled/starred the same way.
