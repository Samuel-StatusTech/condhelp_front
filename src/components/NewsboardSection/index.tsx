import { useEffect, useState } from "react"
import * as S from "./styled"

import { TNews } from "../../utils/@types/data/news"
import { getDateStr } from "../../utils/tb/format/date"
import Divider from "../_minimals/Divider"

import { ReactComponent as NewsIcon } from "../../assets/icons/newspaper.svg"
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg"
import { ReactComponent as Logo } from "../../assets/icons/logo_white.svg"
import { ReactComponent as OkIcon } from "../../assets/icons/valid.svg"

type NewsItemProps = {
  data: TNews
  toggleCheck: (id: string) => void
  k: number
}

const NewsItem = ({ k, data, toggleCheck }: NewsItemProps) => {
  return (
    <S.NewsItem>
      <S.BannerArea $k={k}>
        {data.img ? <img src={data.img} alt={""} /> : <Logo />}
      </S.BannerArea>
      <S.NewsData>
        <S.Date $k={k}>{getDateStr(data.date, "dmy")}</S.Date>
        <S.Title $k={k}>{data.title}</S.Title>
        <S.Message $k={k}>{data.message}</S.Message>

        <Divider />

        {data.read ? (
          <S.ReadedInfo $k={k}>
            <OkIcon />
            <span>Mensagem lida</span>
          </S.ReadedInfo>
        ) : (
          <S.ReadCheckArea $k={k} onClick={() => toggleCheck(data.id)}>
            <S.CheckArea />
            <span>Informo que visualisei este recado</span>
          </S.ReadCheckArea>
        )}
      </S.NewsData>
    </S.NewsItem>
  )
}

const NewsboardSection = () => {
  const [news, setNews] = useState<TNews[]>([])
  const [filters, setFilters] = useState({ unread: true, read: true })

  const handleFilter = (filter: "unread" | "read") => {
    const newValue = !filters[filter]
    setFilters({ ...filters, [filter]: newValue })
  }

  const handleNewsCheck = (id: string) => {
    // ...

    setNews(news.map((n) => (n.id !== id ? n : { ...n, read: true })))
  }

  useEffect(() => {
    // ...

    setNews([
      {
        id: "news1",
        date: new Date(),
        title: "Título",
        message: "Lorem ipsum",
        read: false,
      },
      {
        id: "news2",
        date: new Date(),
        title: "Título",
        message: "Lorem ipsum",
        read: false,
      },
      {
        id: "news3",
        date: new Date(),
        title: "Título",
        message: "Lorem ipsum",
        read: false,
      },
    ])
  }, [])

  return (
    <S.Section>
      <S.SectionHeader>
        <S.HeaderLeft>
          <NewsIcon />
          <span>
            Mural de avisos{" "}
            {news.length > 0
              ? `(${news.filter((n) => !n.read).length} não lido${
                  news.filter((n) => !n.read).length > 1 ? "s" : ""
                })`
              : ""}
          </span>
        </S.HeaderLeft>
        <S.HeaderRight>
          <S.FilterItem onClick={() => handleFilter("unread")}>
            <S.FilterCheck>{filters.unread && <CheckIcon />}</S.FilterCheck>
            <span>Não lidos</span>
          </S.FilterItem>
          <S.FilterItem onClick={() => handleFilter("read")}>
            <S.FilterCheck>{filters.read && <CheckIcon />}</S.FilterCheck>
            <span>Lidos</span>
          </S.FilterItem>
        </S.HeaderRight>
      </S.SectionHeader>
      <S.SectionList>
        {news
          .filter((n) => {
            if (n.read) {
              return filters.read
            } else {
              return filters.unread
            }
          })
          .map((item, k) => (
            <NewsItem k={k} key={k} data={item} toggleCheck={handleNewsCheck} />
          ))}
      </S.SectionList>
    </S.Section>
  )
}

export default NewsboardSection
