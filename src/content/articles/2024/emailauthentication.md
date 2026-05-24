---
title: "How To Secure Your Google Workspace Domain Email with SPF, DKIM, and DMARC Records"
description: "Step-by-step guide on how to secure your Google Workspace Domain Email with SPF, DKIM, and DMARC Records."
pubDate: "2024-02-20T06:30:52"
updatedDate: "2024-02-20T06:38:03"
draft: false
type: "post"
slug: "emailauthentication"
permalink: "/emailauthentication/"
legacyPermalink: "https://www.mikemurphy.co/emailauthentication/"
canonicalUrl: "https://mikemurphy.ai/emailauthentication/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2024/02/THUMBNAIL_EMAIL-SECURITY-scaled.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2024/02/THUMBNAIL_EMAIL-SECURITY-scaled.jpg"
categories: 
  - "Blog"
  - "Google"
  - "Tech & Productivity"
tags: []
topics: []
search:
  include: true
  boost: 0.7
migration:
  dryRun: false
  prioritySample: false
  review: false
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-wxr
wp:
  id: "213558"
  postType: "post"
  rawWordCount: 1706
seo:
  legacyTitle: "How To Secure Your Google Workspace Domain Email with SPF, DKIM, and DMARC Records - Mike Murphy Co"
  legacyH1: "How To Secure Your Google Workspace Domain Email with SPF, DKIM, and DMARC Records"
  legacyCanonical: "https://www.mikemurphy.co/emailauthentication/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 1747
youtube: 
  - "https://youtu.be/Ou1lWC7l4g4"
---
[![Email Authentication](/assets/media/2024/02/THUMBNAIL_EMAIL-SECURITY-scaled.jpg)](/assets/media/2024/02/THUMBNAIL_EMAIL-SECURITY-scaled.jpg)

 

**Who is this tutorial for?  
**[Google Workspace](https://www.mikemurphy.co/googleworkspace) users with a custom Gmail address using a domain name you own and manage.

- If your Google Workspace Organization sends over 5000 emails/day, [setting up email authentication is required as of Feb 2024](https://bit.ly/3I93LOY).
- Has a client or customer ever told you that your emails always end up in their Spam/Junk folder?
- Are you a brand or business wanting to protect against phishing & spoofing threats?
- Do you want peace of mind that emails sent to and from your domain are secure and trusted?

**Overview:  
**This is a step-by-step tutorial on how to set up email authentication for your domain and email on Google Workspace and your domain provider by adding SPF, DKIM & DMARC records.

**Purpose:  
**Email Authentication helps protect you against phishing, spoofing (impersonating) and to help make sure your emails are ‘trusted’ and do not get labeled as ‘Spam’.

**What You Will Need To Set Up::**

- Administrator credentials to sign in to Google Workspace.
- Administrator credentials to sign in to Domain Provider to manage DNS Settings.

**  
Time To Set Everything Up:  
**Start-to-finish set up should take approximately 30-60 minutes for the average user.  
DNS Records can take 24-48 Hours To Update (but typically much less time is required).

**  
Summary of the Email Authentication Terms (source: Google)**

- [Sender Policy Framework (SPF)](https://support.google.com/a/answer/33786): SPF specifies the servers and domains that are authorized to send email on behalf of your organization. Email delivery & spoof prevention.
- [DomainKeys Identified Mail (DKIM)](https://support.google.com/a/answer/174124): DKIM add a digital signature to every outgoing message, which lets receiving servers verify the message actually came from your organization. DKIM increases security protection for outgoing mail.
- [Domain-based Message Authentication, Reporting, and Conformance (DMARC)](https://support.google.com/a/answer/2466580): DMARC lets you tell receiving servers what to do with outgoing messages from your organization that don’t pass SPF or DKIM and you can receive reports that can help identify attacks or vulnerabilities.

**How To Set Up Email Authentication (12 Steps Below):**

1.  Check Your Current Status (Check MX)
2.  Gather Credentials (Logins & Passwords)
3.  Create Email Alias Address (Google Workspace)
4.  Define SPF Record (Google Help Article)
5.  Add TXT Record for SPF (Domain Provider)
6.  Generate DKIM Record (Google Workspace)
7.  Add TXT Record Name for DKIM (Domain Provider)
8.  Add TXT Record Value for DKIM (Domain Provider)
9.  Start Authentication (Google Workspace)
10. Define DMARC Policy
11. Add DMARC TXT Record (Domain Provider)
12. Check Your Current Status (Check MX

 

——————————

### **Step By Step Tutorial: How To Setup SPF, DKIM & DMARC**

——————————

**Chapters:**  
00:00 Intro: About The Tutorial  
00:10 Step 1: Check Current Status  
00:20 Step 2. Gather Credentials  
00:32 Step 3: Create Email Alias Address (Google Workspace)  
00:51 Step 4. Define SPF Record (Google Help Article)  
01:06 Step 5: Add TXT Record for SPF (Domain Provider)  
01:54 Step 6: Generate DKIM Record (Google Workspace)  
02:41 Step 7: Add TXT Record Name for DKIM (Domain Provider)  
03:05 Step 8: Add TXT Record Value for DKIM (Domain Provider)  
03:29 Step 9: Start Authentication (Google Workspace)  
03:40 Step 10: Define DMARC Policy  
03:54 Step 11: Add DMARC TXT Record (Domain Provider)  
04:37 Step 12: Check Your Current Status (Check MX)

[![The Steps_v2](/assets/media/2024/02/The-Steps_v2.png)](/assets/media/2024/02/The-Steps_v2.png) Step-By-Step Guide To Email Authentication

**  
Step 1: Check Your Current Status (Check MX)  
**Before diving into setup, use the Google Admin Toolbox to check your domain's MX records to see if you need to continue or to use as a ‘before and after’ comparison.

[Google Admin Toolbox: Check MX](https://toolbox.googleapps.com/apps/checkmx/)

- - Type in your URL (for example, [mikemurphy.co](http://mikemurphy.co))
  - Tap Enter/Return or Click on ‘Run Checks!’
  - Review Results

 

[![Google Toolbox MX](/assets/media/2024/02/Google-Toolbox-MX-1.png)](/assets/media/2024/02/Google-Toolbox-MX-1.png) Step 1: Check Current Status

**  
Step 2:** **Gather Credentials (Logins & Passwords)  
**You need to have administrative access to Google Workspace & Domain Provider

1.  User Name & Password for [Google Workspace](https://www.mikemurphy.co/googleworkspace)
2.  User Name & Password for Domain Provider (i.e. [SiteGround](https://mikemurphy.co/siteground))

[![](/assets/media/2024/02/Credentials.png)](/assets/media/2024/02/Credentials.png) Step 2: Gather Credentials

**  
Step 3:** **Create Email Alias Address (Google Workspace)  
**Setup an [email alias address](https://support.google.com/domains/answer/6304345?hl=en) (of your choice) to be used in the DMARC Record and receive reports.

1.  Sign in to the [Admin console](https://admin.google.com/).
2.  Navigate to Menu \> Directory \> Users.
3.  Click on administrator user name
4.  Click Add Alternate Emails.
5.  Click Alternate email
6.  Enter a name for the alias (i.e. ***dmarc-reports)***
7.  Click ‘Save’.

> ``` p4
> The new email alias address is: dmarc-reports@yourdomain.com
> ```

[![CREATE EMAIL ALIAS](/assets/media/2024/02/CREATE-EMAIL-ALIAS.png)](/assets/media/2024/02/CREATE-EMAIL-ALIAS.png) Step 3: Create Email Alias Address (Google Workspace)

**Step 4**: **Define SPF Record (Google Help Article)  
**The [SPF Record](https://support.google.com/a/answer/10685031?hl=en) tells recipient not to label your email as Spam and helps prevent spoofing. This step requires you to add a TXT Record in the DNS Settings at your domain name provider (i.e. SiteGround)

1.  Visit this [Google Workspace article](https://support.google.com/a/answer/10685031?hl=en)
2.  Copy SPF Record to clipboard (Cmd/Ctrl + C)  
    **v=spf1 include:\_spf.google.com ~all**

[![Copy SPF Record](/assets/media/2024/02/Copy-SPF-Record.png)](/assets/media/2024/02/Copy-SPF-Record.png) Step 4: Define SPF Record (Google Help Article)

**  
Step 5: Add TXT Record for SPF (Domain Provider)  
**Domain Provider is where you set up and manage the Google Workspace MX Records for Gmail.

1.  Sign in to Domain Provider (i.e. SiteGround)
2.  Go to ‘DNS Zone Editor’ or ‘Manage DNS Settings’
3.  Select Domain Name
4.  Add TXT Record
5.  In the Name Field:  
    Enter @ for the root domain name or leave blank if you use Siteground.
6.  In the Value Field, paste the SPF Record copied from [Google Help Article](https://support.google.com/a/answer/10685031?hl=en):  
    **v=spf1 include:\_spf.google.com ~all**
7.  Click ‘Create’ or ’Save’ to create the TXT Record

[![TXT_SPF](/assets/media/2024/02/TXT_SPF-1.png)](/assets/media/2024/02/TXT_SPF-1.png) Step 5: Add TXT Record for SPF (Domain Provider)

**Step 6: Generate DKIM Record (Google Workspace)  
**The DKIM Record is generated in Google Workspace and adds a digital signature to verify emails were sent by your organization and can be trusted.

1.  1.  Sign in to Google Workspace as Administrator
    2.  Go to Apps \> Gmail
    3.  Go to ‘Authenticate Email’
    4.  Confirm the correct domain name is selected
    5.  Click on ‘Generate Record’
    6.  Set to ‘2048’ and keep ‘Google’ as prefix
    7.  Copy **‘google_domainkey’** at the top of the DKIM Record

[![DKIM_GENERATE KEY](/assets/media/2024/02/DKIM_GENERATE.png)](/assets/media/2024/02/DKIM_GENERATE.png) Step 6: Generate DKIM Record (Google Workspace)

 

 

 

[![DKIM TXT RECORD NAME](/assets/media/2024/02/DKIM_DOMAIN-KEY.png)](/assets/media/2024/02/DKIM_DOMAIN-KEY.png) Step 6: Generate DKIM Record (Google Workspace)

 

**Step 7: Add TXT Record Name for DKIM (Domain Provider)**

1.  1.  Go to ‘DNS Zone Editor’ or ‘Manage DNS Settings’
    2.  Select Domain Name
    3.  Add TXT Record
    4.  Paste **google_domainkey** for Name
    5.  Click ‘Create’ or ’Save’ to create the TXT Record

 

[![TXT_DOMAIN KEY](/assets/media/2024/02/TXT_DOMAIN-KEY-1.png)](/assets/media/2024/02/TXT_DOMAIN-KEY-1.png) Step 7: Add TXT Record Name for DKIM (Domain Provider)

 

**Step 8: Add TXT Record Value for DKIM (Domain Provider)**

1.  1.  Copy DKIM TXT Record Value from Google Workspace
    2.  Return to Domain Name Provider(DNS Editor)
    3.  Paste **DKIM TXT Record Value** in the Value Field
    4.  Click ‘Create’ to generate TXT Record

[![DKIM NAME & VALUE FIELDS](/assets/media/2024/02/DKIM-NAME-VALUE-FIELDS.png)](/assets/media/2024/02/DKIM-NAME-VALUE-FIELDS.png) Step 8: Add TXT Record Value for DKIM (Domain Provider)

 

[![CREATE DKIM TEXT RECORD](/assets/media/2024/02/CREATE-DKIM-TEXT-RECORD-1.png)](/assets/media/2024/02/CREATE-DKIM-TEXT-RECORD-1.png) Step 8: Add TXT Record Value for DKIM (Domain Provider)

**  
Step 9: Start Authentication (Google Workspace)**

1.  1.  Return to Google Workspace
    2.  Confirm the correct domain name is selected
    3.  Go to ‘Authenticate Email’
    4.  Go to Apps \> Gmail
    5.  Click on ’Start Authentication’
    6.  Click ‘Save’

[![START AUTH](/assets/media/2024/02/START-AUTH-1.png)](/assets/media/2024/02/START-AUTH-1.png) Step 9: Start Authentication (Google Workspace)

 

 

**Step 10: Define DMARC Policy  
**– DMARC lets you define what servers should do if emails fail authentication checks.  
– The ‘rua’ email address is where DMARC reports are sent (alias email previously set up.  
– It is recommended to start with  ***‘p=none’*** to confirm emails are working properly. Change to ***‘‘p=reject’*** once confident everything is working properly.  
– DMARC helps senders and receivers protect against spam, phishing, and spoofing threats.

- [Define your DMARC record](https://support.google.com/a/answer/10032169?hl=en#:~:text=Your%20Domain%2Dbased%20Message%20Authenticationmessages%20that%20fail%20authentication%20checks) (Google Workspace Help)
- [How to configure SPF, DKIM and DMARC records?](https://www.siteground.com/kb/configure-spf-dkim-dmarc-records/?gclid=CjwKCAiAt5euBhB9EiwAdkXWO_V2XAPL-orh5qn9dRJDxgLU2hTnZCOB0OCUAr16MXzTqj4RYjZf1hoClj0QAvD_BwE) (SiteGround)

**Sample DMARC Policies:** (change to your email alias address set up for DMARC Reports)

1.  **'None' DMARC Policy (Recommend To Start & For Testing Purposes Only):  
    **Take no action on the message and deliver it to the intended recipient. Log messages in a daily report. The report is sent to the email address specified with the rua option in the record. **  
    **v=DMARC1; p=none; rua=mailto:alias@your_domain.com
2.  **‘Quarantine’ DMARC Policy (More Secure)  
    **Mark the messages as spam and send it to the recipient's spam folder. Recipients can review spam messages to identify legitimate messages. This is a good 'next step' after testing with p='none'.  
    v=DMARC1; p=quarantine; rua=mailto:alias@your_domain.com
3.  **‘Reject’ DMARC Policy (Most Secure)  
    **Reject the message. With this option, the receiving server usually sends a bounce message to the sending server.  
    v=DMARC1; p=reject; rua=mailto:alias@your_domain.com

[![](/assets/media/2024/02/DMARC-RECORD_HELP-ARTICLE.png)](/assets/media/2024/02/DMARC-RECORD_HELP-ARTICLE.png) Step 10: Define DMARC Policy

 

 

**  
Step 11: Add DMARC TXT Record (Domain Provider)  
**[How To Add your DMARC Record](https://support.google.com/a/answer/2466563?hl=en&ref_topic=2759254) (Google Workspace Help)

1.  Copy DMARC Policy to clipboard (Cmd/Ctrl + C)
2.  Sign in to Domain Provider (i.e. SiteGround)
3.  Go to ‘DNS Zone Editor’ or ‘Manage DNS Settings’
4.  Select Domain Name
5.  Add TXT Record
6.  In the Name Field: **\_dmarc**
7.  In the Value Field:  
    v=DMARC1; p=none; rua=[mailto:alias@your_domain.com](mailto:alias@your_domain.com) (change email address)
8.  Click ‘Create’ to generate TXT Record

[![ADD DMARC RECORD](/assets/media/2024/02/ADD-DMARC-RECORD-1.png)](/assets/media/2024/02/ADD-DMARC-RECORD-1.png) Step 11: Add DMARC TXT Record (Domain Provider)

**  
Step 12: Check Your Current Status (Check MX)  
**Confirm everything is setup correctly. you should see all green check mark!

- [Google Admin Toolbox: Check MX](https://toolbox.googleapps.com/apps/checkmx/)  
    
  - Type in your URL (for example, [mikemurphy.co](http://mikemurphy.co))
  - Tap Enter/Return or Click on ‘Run Checks!’
  - Review Results

[![SUCCESS](/assets/media/2024/02/SUCCESS-1.png)](/assets/media/2024/02/SUCCESS-1.png) Step 12: Check Your Current Status (Check MX)

<https://youtu.be/Ou1lWC7l4g4>

### **Need Help Setting Up?**

[Reach out to me](https://www.mikemurphy.co/contact/) if you have questions or want to hire me to set up your SPF, DKIM, and DMARC on Google Workspace & Domain Provider.
