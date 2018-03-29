# Tidy Text Berlin

In this session, we will explore the [tidytext](https://cran.r-project.org/web/packages/tidytext/tidytext.pdf) package in R. We will follow the examples in Julia Silge and David Robinson's [Text Mining with R: A Tidy Approach](https://www.tidytextmining.com/). But we will tailor our examples to literature about Berlin.

## Getting Started with R and R Studio

## Tidy Text Mining

```r
install.packages("tidytext")
install.packages("tokenizers")
install.packages("dplyr")
install.packages("stringr")
install.packages("ggplot2")
install.packages("gutenbergr")
install.packages("magrittr")
install.packages("tidyr")
install.packages("wordcloud")
```

```r
library(tidytext)
library(tokenizers)
library(dplyr)
library(stringr)
library(ggplot2)
library(gutenbergr)
library(magrittr)
library(tidyr)
library(wordcloud)
```

```r
titles <- gutenberg_works(str_detect(title, "Berlin"))
books <- gutenberg_download(titles$gutenberg_id, meta_fields = c("title", "author"))
```

```r
bookslines <- books %>%
    group_by(title) %>%
    mutate(line = row_number()) %>%
    ungroup()
```

```r
tidy_books <- bookslines %>% unnest_tokens(word, text)
tidy_books <- tidy_books %>% anti_join(stop_words)
```

```r
tidy_books %>% count(word, sort = TRUE)
```

```r
tidy_books %>%
      count(word, sort = TRUE) %>%
      filter(n > 500) %>%
      mutate(word = reorder(word, n)) %>%
      ggplot(aes(word, n)) +
      geom_col() +
      xlab(NULL) +
      coord_flip()
```

```r
paristitles <- gutenberg_works(str_detect(title, "Paris"))
parisbooks <- gutenberg_download(paristitles$gutenberg_id, meta_fields = c("title", "author"))
```

```r
londontitles <- gutenberg_works(str_detect(title, "London"))
londonbooks <- gutenberg_download(londontitles$gutenberg_id, meta_fields = c("title", "author"))


```r
tidy_paris <- parisbooks %>%
    unnest_tokens(word, text) %>%
    anti_join(stop_words)
```

```r
tidy_london <- londonbooks %>%
    unnest_tokens(word, text) %>%
    anti_join(stop_words)
```

```r
frequency <- bind_rows(mutate(tidy_paris, city = "Paris"),
                       mutate(tidy_books, city = "Berlin")) %>%
    mutate(word = str_extract(word, "[a-z']+")) %>%
    count(city, word) %>%
    group_by(city) %>%
    mutate(proportion = n / sum(n)) %>%
    select(-n) %>%
    spread(city, proportion) %>%
    gather(city, proportion, `Paris`:`Berlin`)
```

```r
ggplot(frequency, aes(x = proportion, y = Berlin, color = abs(Berlin - proportion))) +
    geom_abline(color = "gray40", lty = 2) +
    geom_jitter(alpha = 0.1, size = 2.5, width = 0.3, height = 0.3) +
    geom_text(aes(label = word), check_overlap = TRUE, vjust = 1.5) +
    scale_x_log10(labels = percent_format()) +
    scale_y_log10(labels = percent_format()) +
    scale_color_gradient(limits = c(0, 0.001), low = "darkslategray4", high = "gray75") +
    facet_wrap(~city, ncol = 2) +
    theme(legend.position="none") +
    labs(y = "Berlin", x = NULL)
```

```r
cor.test(data = frequency[frequency$city == "Paris",], ~ proportion + Berlin)
```

```r
cor.test(data = frequency[frequency$city == "London",], ~ proportion + Berlin)
```


```r
sentiment <- tidy_books %>%
      inner_join(get_sentiments("bing"), by = "word") %>%
      count(title, index = line %/% 80, sentiment) %>%
      spread(sentiment, n, fill = 0) %>%
      mutate(sentiment = positive - negative)
```

```r
ggplot(sentiment, aes(index, sentiment, fill = title)) +
      geom_bar(stat = "identity", show.legend = FALSE) +
      facet_wrap(~title, ncol = 2, scales = "free_x")
```

```r
tidy_books %>%
    count(word) %>%
    with(wordcloud(word, n, max.words = 100))
```
